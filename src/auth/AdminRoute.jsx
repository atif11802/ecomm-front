import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index.js";

const AdminRoute = ({ component: Component, ...rest }) => {
	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /signin page
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated().user.role === 1 ? (
					<Component {...props} />
				) : (
					<Redirect to="/signin" />
				)
			}
		/>
	);
};

export default AdminRoute;
