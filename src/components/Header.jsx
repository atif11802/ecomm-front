import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import { isAuthenticated, signout } from "../auth";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import { itemTotal } from "./cartHelper";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const Header = () => {
	//contextapi

	let history = useHistory();

	const { user } = isAuthenticated();

	useEffect(() => {
		// console.log("hello");
	}, [user]);

	const logout = () => {
		signout();
		history.push("/signup");
	};

	const handleCart = () => {
		history.push("/checkout");
	};

	return (
		<div className="header">
			<Link to="/">
				<div className="header__left">
					<h2>ratul</h2>

					<img
						src="https://www.svgrepo.com/show/294105/online-shopping-commerce-and-shopping.svg"
						alt=""
					/>
				</div>
			</Link>

			<div className="header__right">
				{isAuthenticated() && (
					<div className="header__rightButton">
						<Button
							variant="contained"
							color="success"
						>
							<Link to="/user/dashboard">
								User Dashboard
							</Link>
						</Button>
					</div>
				)}
				{isAuthenticated() &&
					isAuthenticated().user.role === 1 && (
						// isAuthenticated().user.role === 1 && (
						<div className="header__rightButton">
							<Button
								variant="contained"
								color="success"
							>
								<Link to="/admin/dashboard">
									Admin
									Dashboard
								</Link>
							</Button>
						</div>
					)}

				{!user && (
					<div className="header__rightButtons">
						<div className="header__rightButton">
							<Button
								variant="contained"
								color="success"
							>
								<Link to="/signin">
									sign in
								</Link>
							</Button>
						</div>
						<div className="header__rightButton">
							<Button
								variant="contained"
								color="success"
							>
								<Link to="/signup">
									sign UP
								</Link>
							</Button>
						</div>
					</div>
				)}
				{user && (
					<div className="header__rightButton">
						<Button
							variant="contained"
							color="success"
							onClick={logout}
						>
							logout
						</Button>
					</div>
				)}
				<div
					className="header__rightButton"
					onClick={handleCart}
				>
					<IconButton
						// color="primary"
						aria-label="add to shopping cart"
						variant="contained"
						color="error"
					>
						<AddShoppingCartIcon />
						{itemTotal()}
					</IconButton>
				</div>
			</div>
		</div>
	);
};

export default Header;
