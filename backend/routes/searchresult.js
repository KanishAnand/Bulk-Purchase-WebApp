var MongoClient = require("mongodb");
var express = require("express");
var router = express.Router();

// @route POST /searchresult
// @desc view all products  of search result
// @access Public
router.post("/", (req, res) => {
	var url = "mongodb://localhost:27017/test";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var search = req.body["search"];
		var query = { name: search };
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

// @route POST /searchresult
// @desc view all products  of search result sorted
// @access Public
router.post("/sortbyprice", (req, res) => {
	var url = "mongodb://localhost:27017/test";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var search = req.body["search"];
		var query = { name: search };
		dbo.collection("products")
			.find(query)
			.sort({ price: 1 })
			.toArray(function(err, result) {
				if (err) throw err;
				console.log(result);
				res.send(result);
				db.close();
			});
	});
});

// @route POST /searchresult
// @desc view all products  of search result sorted
// @access Public
router.post("/sortbyquantity", (req, res) => {
	var url = "mongodb://localhost:27017/test";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var search = req.body["search"];
		var query = { name: search };
		dbo.collection("products")
			.find(query)
			.sort({ quantity: 1 })
			.toArray(function(err, result) {
				if (err) throw err;
				console.log(result);
				res.send(result);
				db.close();
			});
	});
});

module.exports = router;
