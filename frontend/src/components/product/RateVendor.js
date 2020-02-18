import React, { Component } from "react";
import ls from "local-storage";
import axios from "axios";
const Validator = require("validator");
const isEmpty = require("is-empty");
// const Validator = require("validator");

class MyOrders extends Component {
	constructor() {
		super();
		this.state = {
			response: []
		};
	}
	// const response;
	componentDidMount() {
		const data = { email: ls.get("email") };
		axios
			.post("/product/placedproducts", data)
			.then(res => {
				console.log(res.data);
				this.setState({ response: res.data });
			})
			.catch(function(res) {
				console.log("erer");
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
	}

	onSubmit = arg => e => {
		e.preventDefault();
		const ratingdata = {
			rating: document.getElementById(arg - 1).value,
			vendormail: document.getElementById(arg - 3).innerHTML
		};
		console.log(ratingdata);
		if (!Validator.isInt(ratingdata.rating)) {
			alert("Invalid Vendor Rating");
			window.location.reload();
			return;
		}
		const val = parseInt(ratingdata.rating);
		if (val > 5 || val <= 0) {
			alert("Vendor Rating should be in range 1-5");
			window.location.reload();
			return;
		}
		axios
			.post("/product/vendorating", ratingdata)
			.then(res => {
				console.log(res.data);
				alert("Vendor Rated Succesfully");
				window.location.reload();
			})
			.catch(function(res) {
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
	};

	createTable() {
		let table = [];
		let i = 0;
		let heading = [
			<td key={i++}>Product Name</td>,
			<td key={i++}>Price</td>,
			<td key={i++}>Quantity Ordered</td>,
			<td key={i++}>VendorId</td>,
			<td key={i++}>Order Status</td>,
			<td key={i++}>Rate this Vendor</td>
		];

		table.push(<tr key={i++}>{heading}</tr>);
		for (const response of this.state.response) {
			let children = [];
			const { name, price, quantity, vendormail, status } = response;

			children.push(
				<td id={i} key={i++}>
					{name}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{price}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{quantity}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{vendormail}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{status}
				</td>
			);
			children.push(
				<td key={i++}>
					<input
						id={i - 1}
						style={{ width: 100 }}
						className="form-control mr-sm-2"
						type="number"
						min="1"
						max="5"
						placeholder="Rating"
						aria-label="Rating"
					></input>
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					<form onSubmit={this.onSubmit(i - 1)}>
						<button
							className="btn btn-outline-success my-2 my-sm-0"
							type="submit"
						>
							Rate Vendor
						</button>
					</form>
				</td>
			);
			table.push(<tr key={i++}>{children}</tr>);
			i++;
		}
		return table;
	}

	render() {
		const table = this.createTable();

		return (
			<div>
				<table>
					<tbody>{table}</tbody>
				</table>
			</div>
		);
	}
}
export default MyOrders;
