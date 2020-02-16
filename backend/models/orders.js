const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const OrdersSchema = new Schema({
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
	usermail: {
		type: String,
		required: true
	}
});
module.exports = orders = mongoose.model("orders", OrdersSchema);
