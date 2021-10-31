import React, { useState } from "react";
import Layout from "./Layout";
import "../styles/createcategory.css";
import { Button } from "@mui/material";
import { isAuthenticated } from "../auth/index";
import { createCategory } from "./coreApi";
import { useHistory } from "react-router-dom";

const CreateCategory = () => {
	const [category, setCategory] = useState();
	const [error, setErrror] = useState(false);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const history = useHistory();

	// console.log(isAuthenticated());
	const name = category;

	const { token, user } = isAuthenticated();

	const Category = (e) => {
		e.preventDefault();
		// console.log(category);
		setLoading(true);
		createCategory(user._id, token, { name }).then((data) => {
			if (data.error) {
				setErrror(data.error);
				setLoading(false);
				setSuccess(false);
			} else {
				setErrror("");
				setSuccess(data);
				setLoading(false);
			}
		});
	};

	// console.log(success.category.name);

	const handleback = () => {
		history.push("/admin/dashboard");
	};

	return (
		<Layout>
			<div className="createcategory">
				<div className="createcategory__Header">
					<h2>Create Category</h2>
				</div>

				{error && <h2>{error}</h2>}
				{loading && <h2>loading...</h2>}
				{success && (
					<h2>
						{success.category?.name} created
					</h2>
				)}
				<form onSubmit={Category}>
					<input
						value={category}
						onChange={(e) => {
							setCategory(
								e.target.value
							);
						}}
						type="text"
						placeholder="Enter category"
					/>
					<button
						color="success"
						variant="contained"
					>
						Create Category
					</button>
				</form>
				<h2
					className="createcategory__back"
					onClick={handleback}
				>
					Go Back ⬅️
				</h2>
			</div>
		</Layout>
	);
};

export default CreateCategory;
