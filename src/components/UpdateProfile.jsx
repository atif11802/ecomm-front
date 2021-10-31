import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import { isAuthenticated } from "../auth/index";
import { getUserDetails, update, updateUser } from "./coreApi";
import "../styles/updateProfile.css";
import { Link, useHistory } from "react-router-dom";

const UpdateProfile = () => {
	const [values, setValues] = useState({
		name: "",

		password: "",
		error: false,
		success: false,
	});

	const [run, setRun] = useState(false);
	const history = useHistory();
	const { name, password, error, success } = values;

	let { userId } = useParams();
	const { token } = isAuthenticated();
	const { email } = isAuthenticated().user;

	// console.log(userId, user);
	const handleChange = (name) => (e) => {
		setValues({ ...values, error: false, [name]: e.target.value });
	};

	const handleUpdate = () => {
		// console.log(updateName, password);
		// let name = updateName;
		console.log(name, password);

		update(userId, token, { name, password }).then((data) => {
			if (data.err) {
				setValues({ ...values, error: data.err });
			} else {
				setValues({ ...values, success: true });
				updateUser(data.updateUser);
				// console.log(data);
				history.push("/");
				setRun(!run);
			}
		});
	};

	useEffect(() => {
		getUserDetails(userId, token).then((user) => {
			if (user.err) {
				setValues({ ...values, error: user.err });
			} else {
				setValues({
					...values,
					name: user.name,
					email: user.email,
				});
			}
		});
	}, [run]);

	return (
		<Layout>
			<div className="updateprofile">
				<div className="updateprofile__header">
					<h1>update profile</h1>
				</div>
				<div className="updateprofile__userdetails">
					<p>user name : {name}</p>
					<p>user email : {email}</p>
				</div>
				<div className="updateprofile__userUpdate">
					<input
						type="text"
						onChange={handleChange("name")}
						value={name}
					/>
					<input
						type="password"
						onChange={handleChange(
							"password"
						)}
						value={password}
					/>
					<button
						onClick={() => handleUpdate()}
						className="updateprofile__userUpdateButton"
					>
						update Profile
					</button>
				</div>
			</div>
		</Layout>
	);
};

export default UpdateProfile;
