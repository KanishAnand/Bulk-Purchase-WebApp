var MongoClient = require("mongodb");
var express = require("express");
var router = express.Router();

// @route POST /searchresult
// @desc view all products  of search result
// @access Public
router.post("/", (req, res) => {
	// var url = "mongodb://localhost:27017/test";
	// MongoClient.connect(url, function(err, db) {
	// 	if (err) throw err;
	// 	var dbo = db.db("test");
	// 	var search = req.body["search"];
	// 	var query = { name: search };
	// 	dbo.collection("products")
	// 		.find(query)
	// 		.toArray(function(err, result) {
	// 			if (err) throw err;
	// 			console.log(result);
	// 			res.send(result);
	// 			db.close();
	// 		});
	// });

	const Product = require("../models/products");
	var search = req.body["search"];

	if (search === "") {
		Product.find({}).then(resp => {
			newresp = resp.filter(function(a) {
				return a.quantity > 0 && a.status == "Waiting";
			});
			res.send(newresp);
		});
	} else {
		Product.fuzzySearch(search, function(err, resp) {
			newresp = resp.filter(function(a) {
				return a.quantity > 0 && a.status == "Waiting";
			});
			res.send(newresp);
		});
	}
});

// @route POST /searchresult
// @desc view all products  of search result sorted
// @access Public
router.post("/sortbyprice", (req, res) => {
	const Product = require("../models/products");
	var search = req.body["search"];
	if (search === "") {
		Product.find({}).then(resp => {
			resp.sort(function(a, b) {
				return a.price - b.price;
			});
			newresp = resp.filter(function(a) {
				return a.quantity > 0 && a.status == "Waiting";
			});
			res.send(newresp);
		});
	} else {
		// var url = "mongodb://localhost:27017/test";
		// MongoClient.connect(url, function(err, db) {
		// 	if (err) throw err;
		// 	var dbo = db.db("test");
		// 	var search = req.body["search"];
		// 	var query = { name: search };
		// 	dbo.collection("products")
		// 		.find(query)
		// 		.sort({ price: 1 })
		// 		.toArray(function(err, resp) {
		// 			if (err) throw err;
		// 			newresp = resp.filter(function(a) {
		// 				return a.quantity > 0 && a.status == "Waiting";
		// 			});
		// 			res.send(newresp);
		// 			db.close();
		// 		});
		// });
		Product.fuzzySearch(search, function(err, resp) {
			resp.sort(function(a, b) {
				return a.price - b.price;
			});
			newresp = resp.filter(function(a) {
				return a.quantity > 0 && a.status == "Waiting";
			});
			res.send(newresp);
		});
	}
});

// @route POST /searchresult
// @desc view all products  of search result sorted
// @access Public
router.post("/sortbyquantity", (req, res) => {
	const Product = require("../models/products");
	var search = req.body["search"];
	if (search === "") {
		Product.find({}).then(resp => {
			resp.sort(function(a, b) {
				return a.quantity - b.quantity;
			});
			newresp = resp.filter(function(a) {
				return a.quantity > 0 && a.status == "Waiting";
			});
			res.send(newresp);
		});
	} else {
		// var url = "mongodb://localhost:27017/test";
		// MongoClient.connect(url, function(err, db) {
		// 	if (err) throw err;
		// 	var dbo = db.db("test");
		// 	var search = req.body["search"];
		// 	var query = { name: search };
		// 	dbo.collection("products")
		// 		.find(query)
		// 		.sort({ quantity: 1 })
		// 		.toArray(function(err, resp) {
		// 			if (err) throw err;
		// 			newresp = resp.filter(function(a) {
		// 				return a.quantity > 0 && a.status == "Waiting";
		// 			});
		// 			res.send(newresp);
		// 			db.close();
		// 		});
		// });
		Product.fuzzySearch(search, function(err, resp) {
			resp.sort(function(a, b) {
				return a.quantity - b.quantity;
			});
			newresp = resp.filter(function(a) {
				return a.quantity > 0 && a.status == "Waiting";
			});
			res.send(newresp);
		});
	}
});

// @route POST /searchresult/myorders
// @desc view all products  of search result sorted
// @access Public
router.post("/myorders", (req, res) => {
	var url = "mongodb://localhost:27017/test";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var mail = req.body["email"];
		var query = { usermail: mail };
		dbo.collection("orders")
			.find(query)
			.toArray(function(err, result) {
				if (err) {
					res.json(400).json(err);
					return;
				}
				// console.log(result);
				else {
					final_result = [];
					let i = 0;
					// console.log(result.length);
					for (let resp of result) {
						// obj = resp;
						MongoClient.connect(url, function(err, db) {
							if (err) throw err;
							var dbo = db.db("test");
							var query = {
								name: resp.name,
								vendormail: resp.vendormail
							};
							dbo.collection("products")
								.find(query)
								.toArray(function(err, result2) {
									if (err) {
										console.log("EROR");
										res.json(400).json(err);
										return;
									}
									resp["remaining"] = result2[0].quantity;
									final_result.push(resp);
									if (i === result.length - 1) {
										res.send(final_result);
									}
									i++;
									db.close();
								});
						});
					}
					db.close();
				}
			});
	});
});
// router.post("/myorders", (req, res) => {
// 	var url = "mongodb://localhost:27017/test";
// 	MongoClient.connect(url, function(err, db) {
// 		if (err) throw err;
// 		var dbo = db.db("test");
// 		var mail = req.body["email"];
// 		var query = { usermail: mail };
// 		dbo.collection("orders")
// 			.aggregate([
// 				{
// 					$lookup: {
// 						from: "products",
// 						localField: "vendormail",
// 						foreignField: "vendormail",
// 						$match: { usermail: mail },
// 						as: "join"
// 					}
// 				}
// 			])
// 			.toArray(function(err, res) {
// 				console.log(res);
// 				db.close();
// 			});
// 	});
// });

module.exports = router;
