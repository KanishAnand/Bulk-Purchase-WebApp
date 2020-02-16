const ls = require("local-storage");
var MongoClient = require("mongodb");
var express = require("express");
var router = express.Router();
const Product = require("../models/products");
const validateProductInput = require("../validation/product");

// @route POST /product/create
// @desc create product
// @access Public
router.post("/create", (req, res) => {
	const Product = require("../models/products");
	const { errors, isValid } = validateProductInput(req.body);
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	} else {
		const newProduct = new Product({
			name: req.body.name,
			price: req.body.price,
			quantity: req.body.quantity,
			vendormail: req.body.vendormail
		});

		newProduct
			.save()
			.then(newProduct => res.json(newProduct))
			.catch(err => {
				return res.status(400).json(err);
			});
	}
});

// @route POST /product/view
// @desc view all products
// @access Public
router.post("/view", (req, res) => {
	var url = "mongodb://localhost:27017/test";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var mail = req.body["mail"];
		var query = { vendormail: mail };
		dbo.collection("products")
			.find(query)
			.toArray(function(err, result) {
				if (err) throw err;
				console.log(result);
				res.send(result);
				db.close();
			});
	});
});

// @route POST /product/view
// @desc view all products
// @access Public
router.post("/edit", (req, res) => {
	var url = "mongodb://localhost:27017/test";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var name = req.body.name;
		var quantity = req.body.quantity;
		var order_quantity = req.body.order_quantity;
		var vendorid = req.body.vendorid;
		var query = { name: name, vendormail: vendorid };
		var set = { $set: { quantity: quantity - order_quantity } };
		dbo.collection("products").updateOne(query, set, function(err, result) {
			if (err) throw err;
			console.log("23");
			db.close();
		});
	});

	const order = require("../models/orders");
	const newOrder = new order({
		name: req.body.name,
		price: req.body.price,
		quantity: req.body.order_quantity,
		usermail: req.body.usermail,
		vendormail: req.body.vendorid
	});
	console.log(newOrder);

	newOrder
		.save()
		.then(newProduct => res.json(newProduct))
		.catch(err => {
			return res.status(400).json(err);
		});
});

module.exports = router;
