const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ProductSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	vendormail: {
		type: String,
		required: true
	},
	status: {
		type: String,
		required: true,
		default: "Waiting"
	}
});
module.exports = products = mongoose.model("product", ProductSchema);
