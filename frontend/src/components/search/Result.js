import React, { Component } from "react";
import ls from "local-storage";
import axios from "axios";
const Validator = require("validator");

class SearchResult extends Component {
	constructor() {
		super();
		this.state = {
			response: []
		};
	}
	// const response;
	componentDidMount() {
		const data = { search: ls.get("search") };
		axios
			.post("/searchresult", data)
			.then(res => {
				console.log(res.data);
				this.setState({ response: res.data });
			})
			.catch(function(res) {
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
	}

	// onChange = e => {
	// 	this.setState({ [e.target.id]: e.target.value });
	// };

	onSubmit = e => {
		e.preventDefault();
		const data = { search: ls.get("search") };
		axios
			.post("/searchresult/sortbyprice", data)
			.then(res => {
				console.log(res.data);
				this.setState({ response: res.data });
			})
			.catch(function(res) {
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
	};

	onSubmitq = e => {
		e.preventDefault();
		const data = { search: ls.get("search") };
		axios
			.post("/searchresult/sortbyquantity", data)
			.then(res => {
				console.log(res.data);
				this.setState({ response: res.data });
			})
			.catch(function(res) {
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
	};

	onSubmitreview = arg => e => {
		e.preventDefault();
		const data = { vendormail: document.getElementById(arg - 3).innerHTML };
		ls.set("vendormail", data.vendormail);
		window.location = "/vendoreviews";
	};

	onSubmitorder = arg => event => {
		event.preventDefault();
		// console.log(document.getElementById(arg - 1).value);
		const orderdata = {
			name: document.getElementById(arg - 5).innerHTML,
			price: parseInt(document.getElementById(arg - 4).innerHTML),
			quantity: parseInt(document.getElementById(arg - 3).innerHTML),
			vendorid: document.getElementById(arg - 2).innerHTML,
			order_quantity: document.getElementById(arg - 1).value,
			usermail: ls.get("email")
		};
		if (!Validator.isInt(orderdata.order_quantity)) {
			alert("Invalid Order Quantity");
			window.location.reload();
			return;
		}
		const val1 = orderdata.order_quantity;
		const val2 = orderdata.quantity;
		if (val1 > val2 || val1 <= 0) {
			console.log(val1);
			console.log(val2);
			alert("Sorry this quantity is not available");
			window.location.reload();
			return;
		}

		axios
			.post("/product/edit", orderdata)
			.then(res => {
				console.log(res);
				alert("Order Placed Successfuly");
				window.location.reload();
			})
			.catch(function(res) {
				console.log("DF");
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
	};

	createTable() {
		let table = [];
		let i = 0;
		let heading = [
			<td key={i++}>Product Name</td>,
			<td key={i++}>Price</td>,
			<td key={i++}>Quantity</td>,
			<td key={i++}>VendorId</td>,
			<td key={i++}>Quantity to Order</td>,
			<td key={i++}>Order</td>,
			<td key={i++}>Vendor Reviews</td>,
			<td key={i++}>Average Vendor Rating</td>
		];

		table.push(<tr key={i++}>{heading}</tr>);
		for (const response of this.state.response) {
			let children = [];
			const {
				name,
				price,
				quantity,
				vendormail,
				vendorating,
				ratecount
			} = response;

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
				<td key={i++}>
					<input
						id={i - 1}
						style={{ width: 100 }}
						className="form-control mr-sm-2"
						type="number"
						min="1"
						max={quantity}
						placeholder="Quantity"
						aria-label="quantity"
					></input>
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					<form onSubmit={this.onSubmitorder(i - 1)}>
						<button
							className="btn btn-outline-success my-2 my-sm-0"
							type="submit"
						>
							Order
						</button>
					</form>
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					<form onSubmit={this.onSubmitreview(i - 1)}>
						<button
							className="btn btn-outline-success my-2 my-sm-0"
							type="submit"
						>
							Reviews
						</button>
					</form>
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{vendorating / ratecount}
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
				<form onSubmit={this.onSubmit}>
					<button
						style={{
							marginTop: 30,
							marginBottom: 10,
							marginLeft: 10
						}}
						className="btn btn-outline-success my-2 my-sm-0"
						type="submit"
					>
						Sort By Price
					</button>
				</form>
				<form onSubmit={this.onSubmitq}>
					<button
						style={{
							marginTop: 5,
							marginBottom: 30,
							marginLeft: 10
						}}
						className="btn btn-outline-success my-2 my-sm-0"
						type="submit"
					>
						Sort By Quantity
					</button>
				</form>
				<table>
					<tbody>{table}</tbody>
				</table>
			</div>
		);
	}
}
export default SearchResult;
