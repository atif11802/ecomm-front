import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getProducts, remove } from "./coreApi";
import ManageCard from "./ManageCard";
import { isAuthenticated } from "../auth/index";

const ManageProduct = () => {
	const [products, setProducts] = useState([]);
	const [productId, setProductId] = useState();
	const { token, user } = isAuthenticated();

	const deleteProduct = (productId) => {
		console.log(`deleted id ${productId}`);
		setProductId(productId);
		remove(productId, user._id, token);
	};

	useEffect(() => {
		getProducts(100).then((data) => {
			if (data.err) {
				console.log(data.err);
			} else {
				// console.log(data);
				setProducts(data);
			}
		});
	}, [productId]);

	// console.log(products);

	return (
		<Layout>
			<h1>manage product</h1>
			<div className="manageProduct">
				{products &&
					products.map((product, i) => (
						<ManageCard
							deleteProduct={
								deleteProduct
							}
							key={i}
							product={product}
						/>
					))}
			</div>
		</Layout>
	);
};

export default ManageProduct;
