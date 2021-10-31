import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../styles/carditem.css";
import currencyFormatter from "currency-formatter";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { addItem } from "./cartHelper";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MediaCard({ product }) {
	// console.log(product._id);
	let history = useHistory();
	let [cartItems, setCartItems] = useState([]);

	var stringTruncate = function (str, length) {
		var dots = str.length > length ? "..." : "";
		return str.substring(0, length) + dots;
	};

	const goToSinglePage = (productId) => {
		// console.log(productId);
		history.push(`/singleProduct/${productId._id}`);
	};

	const addToCart = (product) => {
		addItem(product, () => {
			toast.error("Added to Cart", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});

			history.push("/checkout");
		});
	};

	return (
		<div className="cardItem">
			<Card sx={{ maxWidth: 345 }}>
				<CardMedia
					component="img"
					height="240"
					image={product.photo}
					alt="green iguana"
				/>
				<CardContent>
					<Typography
						gutterBottom
						variant="h5"
						component="div"
					>
						{product.name}
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
					>
						{stringTruncate(
							product.description,
							25
						)}
						{/* {product.description} */}
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
					>
						{currencyFormatter.format(
							product.price,
							{ locale: "BD" }
						)}
					</Typography>
				</CardContent>
				<CardActions>
					<Button
						onClick={() =>
							goToSinglePage(product)
						}
						size="small"
					>
						View Product
					</Button>
					<Button
						size="small"
						onClick={() =>
							addToCart(product)
						}
					>
						Add to Cart
					</Button>
				</CardActions>
			</Card>
		</div>
	);
}
