const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//express won't allow access to css files without below line which exposes it
app.use(express.static("public"));

// to use req.body objects
app.use(bodyParser.urlencoded({ extended: true }));

// set up our template engine
app.set("view engine", "ejs");

//to return response with url = '\'
app.get("/", function(req, res) {
	res.render("index");
});

//responding to post request
app.post("/", function(req, res) {
	res.render("index");
	console.log(req.body.city);
});

app.listen(3000, function() {
	console.log("Example app listening on port 3000!");
});
