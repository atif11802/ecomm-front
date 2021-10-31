import React from "react";
import Layout from "./Layout";
import "../styles/admindashboard.css";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";

const AdminDashboard = () => {
	const { user } = isAuthenticated();
	// console.log(user);

	return (
		<Layout>
			<div className="admindashboard">
				<h2 className="admindashboard__header">
					Admin Dashboard
				</h2>
				<div className="admindashboard__container">
					<div className="admindashboard__left">
						<div className="admindashboard__leftLinks">
							<p>Admin Links</p>
						</div>
						<div className="admindashboard__leftLinks">
							<Link to="/admin/createCategory">
								{" "}
								Create Category{" "}
							</Link>
						</div>
						<div className="admindashboard__leftLinks">
							<Link to="/admin/createproduct">
								{" "}
								Create Product{" "}
							</Link>
						</div>
						<div className="admindashboard__leftLinks">
							<Link
								to={`/profile/${user._id}`}
							>
								{" "}
								update Profile{" "}
							</Link>
						</div>
						<div className="admindashboard__leftLinks">
							<Link to="/admin/manageProduct">
								{" "}
								Manage product
							</Link>
						</div>
						<div className="admindashboard__leftLinks">
							<Link to="/admin/order">
								{" "}
								Manage Order
							</Link>
						</div>
					</div>
					<div className="admindashboard__right">
						<div className="admindashboard__rightHeader">
							<p>Admin Information</p>
						</div>
						<div className="admindashboard__rightInfo">
							<p>{user.email}</p>
							<p>{user.name}</p>
							<p>
								{
									user.phoneNumber
								}
							</p>
							<p>
								{user.role ===
									1 &&
									"Admin"}
							</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default AdminDashboard;
