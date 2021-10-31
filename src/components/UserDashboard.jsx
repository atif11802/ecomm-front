import React from "react";
import Layout from "./Layout";
import "../styles/userdashboard.css";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";

const UserDashboard = () => {
	const { user } = isAuthenticated();
	// console.log(user);
	return (
		<Layout>
			<div className="userDashboard">
				<div className="userDashboard__left">
					<div className="userDashboard_leftLinks">
						<p>Admin Links</p>
					</div>
					<div className="userDashboard_leftLinks">
						<Link
							to={`/profile/${user._id}`}
						>
							{" "}
							update Profile{" "}
						</Link>
					</div>
					<div className="userDashboard_leftLinks">
						<Link
							to={`/history/${user._id}`}
						>
							History
						</Link>
					</div>
				</div>
				<div className="userDashboard__right">
					<h1>User Details</h1>
					<p>{user.name}</p>
					<p>{user.email}</p>
					<p>{user.phoneNumber}</p>
				</div>
			</div>
		</Layout>
	);
};

export default UserDashboard;
