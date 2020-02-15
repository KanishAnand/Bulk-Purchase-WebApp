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
			.then(user => res.json(newProduct))
			.catch(err => {
				return res.status(400).json(err);
			});
	}
});

// @route GET /product/view
// @desc view all products
// @access Public
router.get("/view", (req, res) => {
	// var MongoClient = require("../config/keys").mongoURI;
	const mail = ls.get("email");
	var url = "mongodb://localhost:27017/test";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var query = { vendormail: "login@gmail.com" };
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
module.exports = router;
