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
		var query = { vendormail: mail, status: "Waiting" };
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
	const order = require("../models/orders");
	const newOrder = new order({
		name: req.body.name,
		price: req.body.price,
		quantity: req.body.order_quantity,
		usermail: req.body.usermail,
		vendormail: req.body.vendorid
	});
	newOrder
		.save()
		.then(newProduct => console.log(newProduct))
		.catch(err => {
			return res.status(400).json(err);
		});
	// console.log("HELO");
	// console.log(newOrder);
	var url = "mongodb://localhost:27017/test";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var name = req.body.name;
		var quantity = parseInt(req.body.quantity);
		var order_quantity = parseInt(req.body.order_quantity);
		var vendorid = req.body.vendorid;
		var query = { name: name, vendormail: vendorid };
		if (quantity - order_quantity == 0) {
			var set = {
				$set: { quantity: quantity - order_quantity, status: "Placed" }
			};
		} else {
			var set = { $set: { quantity: quantity - order_quantity } };
		}
		dbo.collection("products").updateOne(query, set, function(err, result) {
			if (err) throw err;
			console.log("OK");
			db.close();
		});
	});

	var quantity = parseInt(req.body.quantity);
	var order_quantity = parseInt(req.body.order_quantity);
	if (quantity - order_quantity == 0) {
		var url = "mongodb://localhost:27017/test";
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var dbo = db.db("test");
			var name = req.body.name;
			var vendorid = req.body.vendorid;
			var query = { name: name, vendormail: vendorid };
			var set = { $set: { status: "Placed" } };
			dbo.collection("orders").updateMany(query, set, function(
				err,
				result
			) {
				if (err) throw err;
				res.send(result);
				db.close();
			});
		});
	}
});

// @route POST /product/dispatch
// @desc view all ready to dispatch products
// @access Public
router.post("/dispatch", (req, res) => {
	var url = "mongodb://localhost:27017/test";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var mail = req.body["mail"];
		var query = { vendormail: mail, status: "Placed" };
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

// @route POST /product/dispatched
// @desc dispatch products
// @access Public
router.post("/dispatched", (req, res) => {
	var url = "mongodb://localhost:27017/test";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var name = req.body.name;
		var vendorid = req.body.mail;
		var query = { name: name, vendormail: vendorid };
		var set = { $set: { status: "Dispatched" } };
		dbo.collection("products").updateOne(query, set, function(err, result) {
			if (err) throw err;
			db.close();
		});
	});

	var url = "mongodb://localhost:27017/test";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var name = req.body.name;
		var vendorid = req.body.mail;
		var query = { name: name, vendormail: vendorid };
		var set = { $set: { status: "Dispatched" } };
		dbo.collection("orders").updateMany(query, set, function(err, result) {
			if (err) throw err;
			res.send(result);
			db.close();
		});
	});
});

// @route POST /product/dispatchedproducts
// @desc dispatch products
// @access Public
router.post("/dispatchedproducts", (req, res) => {
	var url = "mongodb://localhost:27017/test";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var mail = req.body["mail"];
		var query = { vendormail: mail, status: "Dispatched" };
		dbo.collection("products")
			.find(query)
			.toArray(function(err, result) {
				if (err) throw err;
				res.send(result);
				db.close();
			});
	});
});

// @route POST /product/cancel
// @desc cancel product
// @access Public
router.post("/cancel", (req, res) => {
	var url = "mongodb://localhost:27017/test";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var name = req.body.name;
		var vendorid = req.body.mail;
		var query = { name: name, vendormail: vendorid };
		var set = { $set: { status: "Cancelled" } };
		dbo.collection("products").updateMany(query, set, function(
			err,
			result
		) {
			if (err) throw err;
			// res.send(result);
			db.close();
		});
	});

	var url = "mongodb://localhost:27017/test";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var name = req.body.name;
		var vendorid = req.body.mail;
		var query = { name: name, vendormail: vendorid };
		var set = { $set: { status: "Cancelled" } };
		dbo.collection("orders").updateMany(query, set, function(err, result) {
			if (err) throw err;
			res.send(result);
			db.close();
		});
	});
});

// @route POST /product/rate
// @desc dispatch products
// @access Public
router.post("/rate", (req, res) => {
	var url = "mongodb://localhost:27017/test";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var mail = req.body["mail"];
		var query = { usermail: mail, status: "Dispatched" };
		dbo.collection("orders")
			.find(query)
			.toArray(function(err, result) {
				if (err) throw err;
				res.send(result);
				db.close();
			});
	});
});

router.post("/rateit", (req, res) => {
	console.log("hiowefo");
	const rate = require("../models/ratings");
	const newRate = new rate({
		name: req.body.name,
		rating: req.body.rating,
		review: req.body.review,
		usermail: req.body.usermail,
		vendormail: req.body.vendormail
	});

	console.log(newRate);

	newRate
		.save()
		.then(newRate => res.send(newRate))
		.catch(err => {
			return res.status(400).json(err);
		});
});

router.post("/seerating", (req, res) => {
	var url = "mongodb://localhost:27017/test";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var mail = req.body["mail"];
		var query = { vendormail: mail };
		dbo.collection("ratings")
			.find(query)
			.toArray(function(err, result) {
				if (err) throw err;
				res.send(result);
				db.close();
			});
	});
});

router.post("/vendoreviews", (req, res) => {
	var url = "mongodb://localhost:27017/test";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var mail = req.body["vendormail"];
		var query = { vendormail: mail };
		dbo.collection("ratings")
			.find(query)
			.toArray(function(err, result) {
				if (err) throw err;
				res.send(result);
				db.close();
			});
	});
});

router.post("/placedproducts", (req, res) => {
	var url = "mongodb://localhost:27017/test";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var mail = req.body["email"];
		var query = { usermail: mail, status: "Placed" };
		dbo.collection("orders")
			.find(query)
			.toArray(function(err, result) {
				if (err) throw err;
				res.send(result);
				db.close();
			});
	});
});

router.post("/vendorating", (req, res) => {
	var url = "mongodb://localhost:27017/test";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var vendormail = req.body["vendormail"];
		var rating = req.body["rating"];
		var query = { vendormail: vendormail };
		var set = { $inc: { vendorating: parseInt(rating), ratecount: 1 } };
		dbo.collection("products").updateMany(query, set, function(
			err,
			result
		) {
			if (err) throw err;
			res.send(result);
			db.close();
		});
	});
});

module.exports = router;
