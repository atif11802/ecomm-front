import React from "react";
import "../styles/managecard.css";

const ManageCard = ({ product, deleteProduct }) => {
	// console.log("product", product);

	return (
		<div className="managecard">
			<div className="managecard__title">
				<p>{product.name}</p>
			</div>
			<div className="managecard__middle">
				<button>update</button>
			</div>
			<div className="managecard__right">
				<button
					onClick={() =>
						deleteProduct(product._id)
					}
				>
					delete
				</button>
			</div>
		</div>
	);
};

export default ManageCard;
