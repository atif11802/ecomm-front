import React from "react";
import Header from "./Header";
import "../styles/layout.css";

const Layout = ({ children }) => {
	return (
		<div>
			<Header />
			<div className="wrapper"></div>
			<main className="container">{children}</main>
		</div>
	);
};

export default Layout;
