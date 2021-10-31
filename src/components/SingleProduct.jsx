import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getSingleProduct, relatedProduct } from "./coreApi";
import "../styles/singleproduct.css";
import currencyFormatter from "currency-formatter";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import CardItem from "./CardItem";
import { addItem } from "./cartHelper";
import { useHistory } from "react-router-dom";

const SingleProduct = () => {
	let { productId } = useParams();
	const [values, setValues] = useState({
		product: {},
		error: false,
	});
	const [relatedProducts, setRelatedProducts] = useState([]);

	const { product, error } = values;
	let history = useHistory();

	useEffect(() => {
		relatedProduct(productId).then((product) => {
			setRelatedProducts(product);
		});

		getSingleProduct(productId).then((product) => {
			if (product.err) {
				setValues({ ...values, error: product.err });
			} else {
				setValues({ ...values, product: product });
			}
		});
	}, [productId]);

	const addToCart = (product) => {
		addItem(product, () => {
			history.push("/checkout");
		});
	};

	// console.log(product);

	return (
		<Layout>
			<div className="singleProduct">
				<div className="singleProduct__left">
					<div className="singleProduct__leftheader">
						<div className="singleProduct__leftheaderItem">
							<div className="singleProduct__leftheaderItemLeft">
								<img
									src={
										product.photo
									}
									alt=""
								/>
							</div>
							<div className="singleProduct__leftheaderItemRight">
								<h3>
									{
										product.name
									}
								</h3>
								<p>
									{
										product.description
									}
								</p>
								<p>
									{currencyFormatter.format(
										product.price,
										{
											locale:
												"BD",
										}
									)}
								</p>

								{product.shipping ===
									true && (
									<p>
										Shipping
										possible
									</p>
								)}
								{product.quantity >
									0 && (
									<p>
										Product
										Available
									</p>
								)}

								<p>
									created{" "}
									{
										<Moment
											toNow
										>
											{
												product.createdAt
											}
										</Moment>
									}
								</p>
								<Button
									onClick={() =>
										addToCart(
											product
										)
									}
									variant="contained"
									color="success"
								>
									Add to
									Cart
								</Button>
							</div>
						</div>
					</div>
				</div>
				<div className="singleProduct__right">
					<h1>Related Products</h1>
					{relatedProducts.length > 0 &&
						relatedProducts.map(
							(product, i) => (
								<CardItem
									key={i}
									product={
										product
									}
								/>
							)
						)}
				</div>
			</div>
		</Layout>
	);
};

export default SingleProduct;
