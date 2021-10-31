import axios from "axios";

export const signup = (name, email, password, phoneNumber) => {
	return axios
		.post(`${process.env.REACT_APP_LOCALSERVER}/api/signup`, {
			name,
			email,
			password,
			phoneNumber,
		})
		.then((response) => {
			return response;
		})
		.catch((error) => {
			return error.response;
		});
};

export const signin = (email, password) => {
	return axios
		.post(`${process.env.REACT_APP_LOCALSERVER}/api/login`, {
			email,
			password,
		})
		.then((response) => {
			return response;
		})
		.catch((error) => {
			return error.response;
		});
};

export const authenticate = (data) => {
	localStorage.setItem("jwt", JSON.stringify(data));
};

export const isAuthenticated = () => {
	if (typeof window === "undefined") {
		return false;
	}
	if (localStorage.getItem("jwt")) {
		return JSON.parse(localStorage.getItem("jwt"));
	} else {
		return false;
	}
};

export const signout = () => {
	if (typeof window !== "undefined") {
		localStorage.removeItem("jwt");

		return fetch(
			`${process.env.REACT_APP_LOCALSERVER}/api/logout`,
			{
				method: "POST",
			}
		)
			.then((response) => {
				// console.log("signout success", response);
			})
			.catch((error) => console.log(error));
	}
};
