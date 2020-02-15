const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateProductInput(data) {
	let errors = {};
	// Convert empty fields to an empty string so we can use validator functions
	data.name = !isEmpty(data.name) ? data.name : "";
	data.price = !isEmpty(data.price) ? data.price : "";
	data.quantity = !isEmpty(data.quantity) ? data.quantity : "";

	// Name checks
	if (Validator.isEmpty(data.name)) {
		errors.name = "Product Name field is required";
	}
	// Price checks
	if (Validator.isEmpty(data.price)) {
		errors.price = "Price field is required";
	} else if (!Validator.isInt(data.price)) {
		errors.price = "Price is invalid";
	}
	// Quantity checks
	if (Validator.isEmpty(data.quantity)) {
		errors.quantity = "Quantity field is required";
	} else if (!Validator.isInt(data.quantity)) {
		errors.quantity = "Quantity is invalid";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
