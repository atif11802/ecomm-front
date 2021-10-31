import React, { useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import {
	getBraintreeClientToken,
	processPayment,
	createOrder,
} from "./coreApi";
import { useState } from "react";
import { isAuthenticated } from "../auth/index";
import "../styles/Payment.css";
import { emptyCart } from "./cartHelper";

const Payment = ({ total, setRun = (f) => f, run = undefined, items }) => {
	const [data, setData] = useState({
		loading: false,
		success: false,
		clientToken: null,
		error: "",
		instance: {},
		address: "",
	});

	const handleAddress = (event) => {
		setData({ ...data, address: event.target.value });
	};

	const userId = isAuthenticated() && isAuthenticated().user._id;
	const token = isAuthenticated() && isAuthenticated().token;

	const getToken = (userId, token) => {
		getBraintreeClientToken(userId, token).then((data) => {
			if (data.error) {
				setData({ ...data, error: data.error });
			} else {
				setData({
					...data,
					success: false,
					clientToken: data.clientToken,
				});
			}
		});
	};

	useEffect(() => {
		getToken(userId, token);
	}, []);

	let deliverAddress = data.address;

	const buy = () => {
		//send the nonce to server
		// nonce = data.instance.requestPaymentMethod()
		let nonce;
		let getNonce = data.instance
			.requestPaymentMethod()
			.then((data) => {
				// console.log(data);
				nonce = data.nonce;
				// once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
				// and also total to be charged
				// console.log(
				// 	"send nonce and total to process: ",
				// 	nonce,
				// 	total()
				// );

				const paymentData = {
					paymentMethodNonce: nonce,
					amount: total(),
				};
				// console.log(paymentData);
				processPayment(userId, token, paymentData)
					.then((response) => {
						// console.log(response);
						let createOrderData = {
							products: items,
							transaction_Id:
								response.transaction_Id,
							amount:
								response
									.transaction
									.amount,
							address: deliverAddress,
						};
						createOrder(
							userId,
							token,
							createOrderData
						);

						setData({
							...data,
							error: "",
							success:
								response.success,
						});

						emptyCart(() => {
							console.log(
								"payment success and empty cart"
							);
						});
						setRun(!run);
						//empty cart
						//create order
					})
					.catch((err) => {
						console.log(err);
					});

				// setData({ ...data, error: "" });
			})
			.catch((error) => {
				// console.log("dropin error: ", error);
				setData({ ...data, error: error.message });
			});
	};
	// console.log(data.success);

	return (
		<div className="payment">
			<div className="payment__summary">
				<h2>Your cart Summary</h2>
				<h3>total : {total()}</h3>
			</div>
			<div className="payment__cards">
				{!isAuthenticated() && <p>SIGN IN FIRST</p>}
				{data.error && isAuthenticated() && (
					<p>{data.error}</p>
				)}
				{data.clientToken !== null &&
					data.success === true && (
						<p>
							payment successfully
							completed,Thank You
						</p>
					)}

				{data.clientToken !== null &&
					isAuthenticated() &&
					items.length > 0 && (
						<div className="payment__cardsDropin">
							<div className="payment__cardsDropinAdress">
								<label className="">
									Delivery
									address:
								</label>
								<textarea
									onChange={
										handleAddress
									}
									className=""
									value={
										data.address
									}
									placeholder="Type your delivery address here..."
								/>
							</div>
							<DropIn
								options={{
									authorization:
										data.clientToken,
									paypal: {
										flow:
											"vault",
									},
								}}
								onInstance={(
									instance
								) =>
									(data.instance = instance)
								}
							/>
							<button onClick={buy}>
								Pay
							</button>
						</div>
					)}
			</div>
		</div>
	);
};

export default Payment;
