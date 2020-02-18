const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");
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
	vendorating: {
		type: Number,
		required: true,
		default: 0
	},
	ratecount: {
		type: Number,
		required: true,
		default: 0
	},
	status: {
		type: String,
		required: true,
		default: "Waiting"
	}
});

ProductSchema.plugin(mongoose_fuzzy_searching, { fields: ["name"] });
module.exports = products = mongoose.model("product", ProductSchema);
