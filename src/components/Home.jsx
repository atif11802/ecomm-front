import React, { useEffect } from "react";
import Header from "./Header";
import { getProducts } from "./coreApi.js";
import { useState } from "react";
import Layout from "./Layout";
import CardItem from "./CardItem";
import "../styles/home.css";
import { addItem } from "./cartHelper";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const Home = () => {
	const [products, setProducts] = useState([]);
	const [limit, setLimit] = useState(6);

	let history = useHistory();

	const showmore = () => {
		setLimit(limit + 6);
	};

	const loadProducts = async () => {
		setProducts(await getProducts(limit));
	};

	useEffect(() => {
		loadProducts();
		// getProducts()
	}, [limit]);

	return (
		<Layout>
			{/* <Header /> */}
			<div className="home">
				<div className="home__row">
					{products &&
						products.length > 0 &&
						products.map((product, i) => (
							<CardItem
								product={
									product
								}
								key={i}
							/>
						))}
				</div>
				{products && products.length > 0 && (
					<button
						onClick={showmore}
						className="home__button"
					>
						Load more
					</button>
				)}
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</div>
		</Layout>
	);
};

export default Home;
