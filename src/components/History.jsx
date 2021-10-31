import React, { useEffect } from "react";
import Layout from "./Layout";
import { getPurchageHistory } from "./coreApi.js";
import { isAuthenticated } from "../auth/index";
import { useParams } from "react-router-dom";
import { useState } from "react";
import "../styles/history.css";
import Moment from "react-moment";
import currencyFormatter from "currency-formatter";

const History = () => {
	let { userId } = useParams();
	const user = isAuthenticated() && isAuthenticated().user;
	const token = isAuthenticated() && isAuthenticated().token;
	const [history, setHistory] = useState([]);

	// console.log(userId);
	useEffect(() => {
		getPurchageHistory(user._id, token).then((response) => {
			if (response.error) {
				console.log(response.error);
			} else {
				setHistory(response);
			}
		});
	}, []);

	console.log(history);

	return (
		<Layout>
			<div className="history">
				<h1>Purchase History</h1>
				{history.map((item, index) => {
					return (
						<div
							className="history__items"
							key={index}
						>
							<p>Product Purchsed</p>
							<div className="history__itemsProducts">
								{item.products.map(
									(
										product,
										i
									) => (
										<div
											className="product__details"
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
												<Moment
													toNow
												>
													{
														item.createdAt
													}
												</Moment>
											</p>
											<p>
												{
													product.price
												}{" "}
											</p>
											<p>
												total
												quantity
												of
												product
												:{" "}
												{
													product.count
												}
											</p>
										</div>
									)
								)}
							</div>
							<p>
								{" "}
								total :
								{currencyFormatter.format(
									item.amount,
									{
										locale:
											"BD",
									}
								)}
								{/* {item.amount} */}
							</p>
							<p>
								Status :{" "}
								{item.status}
							</p>
						</div>
					);
				})}
			</div>
		</Layout>
	);
};

export default History;
