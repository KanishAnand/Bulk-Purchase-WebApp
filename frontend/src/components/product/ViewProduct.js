import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class AddProduct extends Component {
	render() {
		axios
			.get("product/view")
			.then(function(res) {
				console.log(res.data[0]);
			})
			.catch(function(res) {
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
		return <h1>dfdfs</h1>;
	}
}

export default AddProduct;
