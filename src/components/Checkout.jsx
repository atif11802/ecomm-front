import React from "react";
import Layout from "./Layout";
import "../styles/checkout.css";
import { getCart } from "./cartHelper";
import { useEffect } from "react";
import { useState } from "react";
import Items from "./Items";
import Payment from "./Payment";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

const Checkout = () => {
	const [items, setItems] = useState([]);
	const [run, setRun] = useState(false);
	let history = useHistory();

	useEffect(() => {
		setItems(getCart());
	}, [run]);

	const total = () => {
		return items.reduce((currentValue, nextValue) => {
			return currentValue + nextValue.count * nextValue.price;
		}, 0);
	};

	return (
		<Layout>
			<div className="checkout">
				{items.length === 0 && (
					<h3>
						Your Cart is Empty{" "}
						<Button
							color="secondary"
							onClick={() => {
								history.push(
									"/"
								);
							}}
						>
							go to home
						</Button>
					</h3>
				)}
				<div className="checkout__itemLeft">
					{items.map((item) => (
						<Items
							item={item}
							setRun={setRun}
							run={run}
						/>
					))}
				</div>
				<div className="checkout__itemRight">
					<Payment
						total={total}
						setRun={setRun}
						run={run}
						items={items}
					/>
				</div>
			</div>
		</Layout>
	);
};

export default Checkout;
