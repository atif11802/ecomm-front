import React, { useState } from "react";
import "../styles/signin.css";
import { signin, authenticate } from "../auth";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Layout from "./Layout";

const SignIn = () => {
	let history = useHistory();

	const [userData, setUserData] = useState({
		email: "",
		password: "",
		err: "",
		success: false,
		loading: false,
	});

	const handleChangeSignIn = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};
	const { email, password } = userData;

	const handleSignIn = (e) => {
		e.preventDefault();
		// console.log(userData);

		if ((email, password)) {
			setUserData({
				...userData,
				err: "",
				loading: true,
			});
			signin(email, password).then((data) => {
				if (data.data.err) {
					setUserData({
						...userData,
						err: data.data.err,
						loading: false,
					});
				} else {
					setUserData({
						...userData,
						err: "",
						loading: false,
					});
					// console.log(data.data);
					authenticate(data.data);
					history.push("/");
				}
				// console.log(data.data.err);
			});
		}
	};

	return (
		<Layout>
			<div className="signin">
				{/* <Header /> */}
				<div className="signin__container">
					<div className="signin__containerHeader">
						<h2>Sign In</h2>
					</div>

					<div className="signin__containerWarning">
						{userData.loading && (
							<h2>
								{
									userData.loading
								}
							</h2>
						)}
						{userData.err && (
							<h2>{userData.err}</h2>
						)}
					</div>

					<div className="signin__containerForm">
						<form onSubmit={handleSignIn}>
							<div className="signin__containerFormInput">
								<input
									onChange={
										handleChangeSignIn
									}
									name="email"
									type="email"
									placeholder="Email"
									value={
										email
									}
								/>
							</div>
							<div className="signin__containerFormInput">
								<input
									onChange={
										handleChangeSignIn
									}
									value={
										password
									}
									name="password"
									type="password"
									placeholder="Password"
								/>
							</div>
							<button type="submit">
								sign in
							</button>
						</form>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default SignIn;
