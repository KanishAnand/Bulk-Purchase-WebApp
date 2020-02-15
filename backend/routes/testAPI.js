var express = require("express");
var router = express.Router();
const User = require("../models/User");

router.get("/", function(req, res, next) {
	// User.find(function(err, users) {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		res.json(users);
	// 	}
	// });
	res.send("API is working properly");
});

module.exports = router;
