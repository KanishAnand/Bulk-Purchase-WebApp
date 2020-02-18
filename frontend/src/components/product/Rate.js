import React, { Component } from "react";
import axios from "axios";
import ls from "local-storage";
const Validator = require("validator");
const isEmpty = require("is-empty");

class Rate extends Component {
	constructor() {
		super();
		this.state = {
			response: []
		};
	}
	// const response;
	componentDidMount() {
		const data = { mail: ls.get("email") };
		axios
			.post("product/rate", data)
			.then(res => {
				this.setState({ response: res.data });
			})
			.catch(function(res) {
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
	}

	onSubmit = arg => e => {
		e.preventDefault();
		const ratingdata = {
			review: document.getElementById(arg - 1).value,
			rating: document.getElementById(arg - 2).value,
			vendormail: document.getElementById(arg - 3).innerHTML,
			name: document.getElementById(arg - 6).innerHTML,
			usermail: ls.get("email")
		};
		console.log(ratingdata);
		if (!Validator.isInt(ratingdata.rating)) {
			alert("Invalid Rating");
			window.location.reload();
			return;
		}
		const val = parseInt(ratingdata.rating);
		if (val > 5 || val <= 0) {
			alert("Rating should be in range 1-5");
			window.location.reload();
			return;
		}
		if (Validator.isEmpty(ratingdata.review)) {
			alert("Enter Some Review");
			window.location.reload();
			return;
		}

		axios
			.post("/product/rateit", ratingdata)
			.then(res => {
				console.log(res);
				alert("Thanks for Rating !");
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
			<td key={i++}>Vendor Id</td>,
			<td key={i++}>Rating</td>,
			<td key={i++}>Reviews</td>,
			<td key={i++}>Rate It !</td>
		];
		table.push(<tr key={i++}>{heading}</tr>);
		for (const response of this.state.response) {
			let children = [];
			const { name, price, quantity, vendormail } = response;

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
						max="5"
						placeholder="4 / 5"
						aria-label="Rating"
					></input>
				</td>
			);
			children.push(
				<td key={i++}>
					<textarea
						id={i - 1}
						style={{ width: 300, height: 60 }}
						className="form-control mr-sm-2"
						placeholder="Very Nice Quality"
						aria-label="Revies"
					></textarea>
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					<form onSubmit={this.onSubmit(i - 1)}>
						<button
							className="btn btn-outline-success my-2 my-sm-0"
							type="submit"
						>
							Rate
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
			<table>
				<tbody>{table}</tbody>
			</table>
		);
	}
}

export default Rate;
