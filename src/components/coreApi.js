import axios from "axios";

export const getProducts = async (limit) => {
	return fetch(
		`${process.env.REACT_APP_LOCALSERVER}/api/products?order=desc&limit=${limit}`,
		{
			method: "GET",
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const createCategory = (userId, token, category) => {
	// console.log(name, email, password);

	return fetch(
		`${process.env.REACT_APP_LOCALSERVER}/api/category/create/${userId}`,
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(category),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const getCategories = () => {
	return fetch(`${process.env.REACT_APP_LOCALSERVER}/api/categories`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const createProduct = (userId, token, product) => {
	// console.log(userId, token, product);

	return fetch(
		`${process.env.REACT_APP_LOCALSERVER}/api/product/create/${userId}`,
		{
			method: "POST",
			headers: {
				Accept: "application/json",

				Authorization: `Bearer ${token}`,
			},
			body: product,
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			return err;
			// console.log(response)
		});
};

export const getUserDetails = (userId, token) => {
	return fetch(
		`${process.env.REACT_APP_LOCALSERVER}/api/user/${userId}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",

				Authorization: `Bearer ${token}`,
			},
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			return err;
			// console.log(response)
		});
};

export const update = (userId, token, user) => {
	console.log("c", user);
	return fetch(
		`${process.env.REACT_APP_LOCALSERVER}/api/user/${userId}`,
		{
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(user),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateUser = (user) => {
	if (typeof window !== "undefined") {
		if (localStorage.getItem("jwt")) {
			let auth = JSON.parse(localStorage.getItem("jwt"));
			auth.user = user;
			localStorage.setItem("jwt", JSON.stringify(auth));
		}
	}
};

export const remove = (productId, userId, token) => {
	// http://localhost:8000/api/product/616599d0eecc6a61532d452f/61617a4455f04b09818726a7
	// console.log(productId, userId, token);

	return fetch(
		`${process.env.REACT_APP_LOCALSERVER}/api/product/${productId}/${userId}/`,
		{
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getSingleProduct = (productId) => {
	return fetch(
		`${process.env.REACT_APP_LOCALSERVER}/api/product/${productId}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			return err;
			// console.log(response)
		});
};

export const relatedProduct = (productId) => {
	return fetch(
		`${process.env.REACT_APP_LOCALSERVER}/api/products/related/${productId}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			return err;
			// console.log(response)
		});
};

export const getBraintreeClientToken = (userId, token) => {
	return fetch(
		`${process.env.REACT_APP_LOCALSERVER}/api//braintree/getToken/${userId}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			return err;
			// console.log(response)
		});
};

export const processPayment = (userId, token, paymentData) => {
	return fetch(
		`${process.env.REACT_APP_LOCALSERVER}/api/braintree/payment/${userId}`,
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(paymentData),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			return err;
			// console.log(response)
		});
};

export const createOrder = (userId, token, createOrder) => {
	return fetch(
		`${process.env.REACT_APP_LOCALSERVER}/api/order/create/${userId}`,
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ order: createOrder }),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			return err;
			// console.log(response)
		});
};

export const getOrders = (userId, token) => {
	return fetch(
		`${process.env.REACT_APP_LOCALSERVER}/api/order/list/${userId}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",

				Authorization: `Bearer ${token}`,
			},
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			return err;
			// console.log(response)
		});
};

export const getStatusValues = (userId, token) => {
	return fetch(
		`${process.env.REACT_APP_LOCALSERVER}/api/order/status-values/${userId}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",

				Authorization: `Bearer ${token}`,
			},
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			return err;
			// console.log(response)
		});
};

export const updateOrderStatus = (userId, token, orderId, status) => {
	return fetch(
		`${process.env.REACT_APP_LOCALSERVER}/api/order/${orderId}/status/${userId}`,
		{
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ status, orderId }),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

// router.put("/orders/by/user/:userId", isAuth, purchaseHistory);

export const getPurchageHistory = (userId, token) => {
	return fetch(
		`${process.env.REACT_APP_LOCALSERVER}/api/orders/by/user/${userId}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			return err;
			// console.log(response)
		});
};
