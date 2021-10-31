import React, { useState } from "react";
import "../styles/signup.css";
import { useHistory } from "react-router-dom";
import Header from "./Header";

import { signup } from "../auth/index";
import Layout from "./Layout";

const SignUp = () => {
	let history = useHistory();
	const [userData, setUserData] = useState({
		name: "",
		email: "",
		password: "",
		phone: "",
		err: "",
		success: false,
		loading: false,
	});

	const handleChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};
	const { name, email, password, phone } = userData;

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if ((name, email, password, phone)) {
				setUserData({
					...userData,
					err: "",
					loading: true,
				});
				signup(name, email, password, phone).then(
					(data) => {
						if (data.data.err) {
							setUserData({
								...userData,
								success: false,
								err:
									data
										.data
										.err,
								loading: false,
							});
						} else {
							history.push("/signin");
							setUserData({
								...userData,
								err: "",
								name: "",
								password: "",
								email: "",
								phone: "",
								success: true,
								loading: false,
							});

							console.log(
								"success",
								userData
							);
						}
					}
				);
			}
		} catch (e) {
			console.log(e);
		}
	};

	// console.log(process.env.REACT_APP_LOCALSERVER);
	return (
		<Layout>
			<div className="signup">
				{/* <Header /> */}
				<div className="signup__container">
					<h3>Sign Up</h3>

					<div className="signup__containerWarning">
						{userData.err !== "" && (
							<h2>{userData.err}</h2>
						)}
						{userData.loading === true && (
							<h2>Loading...</h2>
						)}
					</div>

					<div className="signup__containersignup">
						<form onClick={handleSubmit}>
							<div className="signup__containersignupInput">
								<input
									onChange={
										handleChange
									}
									name="name"
									type="text"
									placeholder="UserName"
									value={
										name
									}
								/>
							</div>
							<div className="signup__containersignupInput">
								<input
									onChange={
										handleChange
									}
									name="email"
									type="email"
									placeholder="Email"
									value={
										email
									}
								/>
							</div>
							<div className="signup__containersignupInput">
								<input
									onChange={
										handleChange
									}
									value={
										password
									}
									name="password"
									type="password"
									placeholder="Password"
								/>
							</div>
							<div className="signup__containersignupInput">
								<input
									value={
										phone
									}
									onChange={
										handleChange
									}
									name="phone"
									type="Text"
									placeholder="Phone no."
								/>
							</div>
							<button className="signup__containersignupButton">
								Sign Up
							</button>
						</form>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default SignUp;
