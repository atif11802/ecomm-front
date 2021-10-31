import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import "../styles/items.css";
import { addItem, updateItem, removeItem } from "./cartHelper";

const Items = ({ item, setRun = (f) => f, run = undefined }) => {
	const [count, setCount] = useState(item.count);

	const handleChange = (productId) => (event) => {
		setRun(!run); // run useEffect in parent Cart
		setCount(event.target.value < 1 ? 1 : event.target.value);
		if (event.target.value >= 1) {
			updateItem(productId, event.target.value);
		}
	};

	return (
		<div className="items">
			<div className="items__item">
				<img src={item.photo} alt={item.name} />
				<p>{item.name}</p>
				<p>{item.price}</p>
				<input
					type="number"
					className="form-control"
					value={count}
					onChange={handleChange(item._id)}
				/>
				<Button
					onClick={() => {
						removeItem(item._id);
						setRun(!run); // run useEffect in parent Cart
					}}
					variant="outlined"
					color="error"
				>
					Remove
				</Button>
			</div>
		</div>
	);
};

export default Items;
