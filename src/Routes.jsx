import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
// import Header from "./components/Header";
import Home from "./components/Home";
import UserDashboard from "./components/UserDashboard";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./components/AdminDashboard";
import CreateCategory from "./components/CreateCategory";
import CreateProduct from "./components/CreateProduct";
import UpdateProfile from "./components/UpdateProfile";
import ManageProduct from "./components/ManageProduct";
import SingleProduct from "./components/SingleProduct";
import Checkout from "./components/Checkout";
import Order from "./components/Order";
import History from "./components/History";

const Routes = () => {
	return (
		<BrowserRouter>
			{/* <Header /> */}
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/signin">
					<SignIn />
				</Route>

				<Route exact path="/checkout">
					<Checkout />
				</Route>

				<Route exact path="/signup">
					<SignUp />
				</Route>
				<Route exact path="/singleProduct/:productId">
					<SingleProduct />
				</Route>
				<PrivateRoute
					path="/history/:userId"
					exact
					component={History}
				/>
				<PrivateRoute
					path="/profile/:userId"
					exact
					component={UpdateProfile}
				/>
				<PrivateRoute
					path="/user/dashboard"
					exact
					component={UserDashboard}
				/>
				<AdminRoute
					path="/admin/order"
					exact
					component={Order}
				/>
				<AdminRoute
					path="/admin/dashboard"
					exact
					component={AdminDashboard}
				/>
				<AdminRoute
					path="/admin/createCategory"
					exact
					component={CreateCategory}
				/>
				<AdminRoute
					path="/admin/createproduct"
					exact
					component={CreateProduct}
				/>
				<AdminRoute
					path="/admin/manageProduct"
					exact
					component={ManageProduct}
				/>
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
