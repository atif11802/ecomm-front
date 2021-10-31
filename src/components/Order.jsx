import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Layout from "./Layout";
import { getOrders, getStatusValues, updateOrderStatus } from "./coreApi";
import { isAuthenticated } from "../auth/index";
import Moment from "react-moment";
import "../styles/order.css";
import currencyFormatter from "currency-formatter";

const Order = () => {
	const [orders, setOrders] = useState([]);
	const [statusValues, setStatusValues] = useState([]);

	const token = isAuthenticated() && isAuthenticated().token;
	const userId = isAuthenticated() && isAuthenticated().user._id;

	useEffect(() => {
		getOrders(userId, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setOrders(data);
			}
		});

		getStatusValues(userId, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setStatusValues(data);
			}
		});
	}, []);
	// console.log(orders);
	// console.log(statusValues);

	const loadOrders = () => {
		getOrders(userId, token).then((data) => {
			// console.log(data);
			if (data.error) {
				console.log(data.error);
			} else {
				setOrders(data);
			}
		});
	};

	const handleStatusChange = (e, orderId) => {
		// console.log(e.target.value, orderId);

		updateOrderStatus(userId, token, orderId, e.target.value).then(
			(data) => {
				// console.log(data);
				if (data.error) {
					console.log("Status update failed");
				} else {
					// console.log(data);
					loadOrders();
				}
			}
		);
	};

	return (
		<Layout>
			<div className="order__header">
				{orders.length > 0 ? (
					<h1>total order : {orders.length}</h1>
				) : (
					<h1>no order yet</h1>
				)}
			</div>
			{orders.length > 0 &&
				orders.map((order, i) => (
					<div key={i} className="order">
						<h1>
							Ordered by{" "}
							{order.user.name}
						</h1>
						<p>
							PhoneNumber :{" "}
							{order.user.phoneNumber}
						</p>
						<p>Address {order.address}</p>
						<div>
							<p>products ordered</p>
							<ol>
								{order.products.map(
									(
										product,
										i
									) => (
										<li
											key={
												i
											}
										>
											<p>
												{
													product.name
												}
											</p>
											<p>
												quantity
												:{" "}
												{
													product.count
												}
											</p>
											<p>
												Product's
												base
												price{" "}
												{currencyFormatter.format(
													product.price,
													{
														locale:
															"BD",
													}
												)}
											</p>
										</li>
									)
								)}
							</ol>
						</div>

						<p>
							total cost :{" "}
							{currencyFormatter.format(
								order.amount,
								{
									locale:
										"BD",
								}
							)}
						</p>
						<div className="form-group">
							<h3 className="mark mb-4">
								Status:{" "}
								{order.status}
							</h3>
							<select
								onChange={(e) =>
									handleStatusChange(
										e,
										order._id
									)
								}
							>
								<option>
									Update
									Status
								</option>
								{statusValues.map(
									(
										status,
										index
									) => (
										<option
											key={
												index
											}
											value={
												status
											}
										>
											{
												status
											}
										</option>
									)
								)}
							</select>
						</div>
						<p>
							ordered{" "}
							{
								<Moment toNow>
									{
										order.createdAt
									}
								</Moment>
							}{" "}
						</p>
					</div>
				))}
		</Layout>
	);
};

export default Order;
