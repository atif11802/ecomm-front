import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import "../styles/createProduct.css";
import { isAuthenticated } from "../auth/index";
import { getCategories, createProduct } from "./coreApi";

const CreateProduct = () => {
	const [values, setValues] = useState({
		name: "",
		description: "",
		price: "",
		categories: [],
		category: "",
		shipping: "",
		quantity: "",
		image: "",
		loading: false,
		error: "",
		createdProduct: "",
		redirectToProfile: false,
		formData: "",
		suceess: false,
	});

	const { user, token } = isAuthenticated();
	const {
		name,
		description,
		price,
		image,
		categories,
		category,
		shipping,
		quantity,
		loading,
		error,
		createdProduct,
		redirectToProfile,
		formData,
		success,
	} = values;

	// load categories and set form data
	const init = () => {
		getCategories().then((data) => {
			if (data.err) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					categories: data.categories,
					formData: new FormData(),
				});
			}
		});
	};

	useEffect(() => {
		init();
	}, []);

	const handleChange = (name) => (event) => {
		const value =
			name === "image"
				? event.target.files[0]
				: event.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value });
	};

	const clickSubmit = (event) => {
		event.preventDefault();

		if (shipping === 0) {
			setValues({ ...values, shipping: false });
		} else {
			setValues({ ...values, shipping: true });
		}
		// values.formData = undefined;

		// console.log(values);
		setValues({ ...values, error: "", loading: true });

		createProduct(user._id, token, formData).then((data) => {
			if (data.error) {
				console.log(data);
				setValues({
					...values,
					error: data.error,
					loading: false,
					suceess: false,
				});
			} else {
				setValues({
					...values,
					category: "",
					shipping: "",
					name: "",
					description: "",
					image: "",
					price: "",
					quantity: "",
					loading: false,
					createdProduct: data.name,
					error: "",
					suceess: true,
				});
			}
		});
	};
	return (
		<Layout>
			<div className="createproduct">
				<div className="createproduct__header">
					<h2>Create Product</h2>
				</div>
				<div className="createproduct__warning">
					{loading && <p>loading....</p>}
					{error && <p>{error}</p>}
					{success && <p>product created</p>}
				</div>
				<form onSubmit={clickSubmit}>
					<div className="createproduct__form">
						<label>Choose One Image</label>
						<input
							type="file"
							onChange={handleChange(
								"image"
							)}
							name="image"
							accept="image/*"
						/>
					</div>
					<div className="createproduct__form">
						<label>Name</label>
						<input
							value={name}
							onChange={handleChange(
								"name"
							)}
							type="text"
						/>
					</div>
					<div className="createproduct__form">
						<label>Description</label>
						<textarea
							value={description}
							type="text"
							onChange={handleChange(
								"description"
							)}
						/>
					</div>
					<div className="createproduct__form">
						<label>Price</label>
						<input
							onChange={handleChange(
								"price"
							)}
							type="number"
							className="form-control"
							value={price}
						/>
					</div>
					<div className="createproduct__form">
						<label>Category</label>
						<select
							onChange={handleChange(
								"category"
							)}
						>
							<option>
								please select
							</option>
							{categories &&
								categories.map(
									(
										c,
										i
									) => (
										<option
											key={
												i
											}
											value={
												c._id
											}
										>
											{
												c.name
											}
										</option>
									)
								)}
						</select>
					</div>
					<div className="createproduct__form">
						<label>Shipping</label>
						<select
							onChange={handleChange(
								"shipping"
							)}
						>
							<option>
								please select
							</option>
							<option value="0">
								No
							</option>
							<option value="1">
								Yes
							</option>
						</select>
					</div>
					<div className="createproduct__form">
						<label>Quantity</label>
						<input
							onChange={handleChange(
								"quantity"
							)}
							type="number"
							className="form-control"
							value={quantity}
						/>
					</div>
					<button>Create Product</button>
				</form>
			</div>
		</Layout>
	);
};

export default CreateProduct;
