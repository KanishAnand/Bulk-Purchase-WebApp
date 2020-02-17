import React, { Component } from "react";
import ls from "local-storage";
import axios from "axios";
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
			.post("/searchresult/myorders", data)
			.then(res => {
				console.log(res.data);
				this.setState({ response: res.data });
			})
			.catch(function(res) {
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
	}

	createTable() {
		let table = [];
		let i = 0;
		let heading = [
			<td key={i++}>Product Name</td>,
			<td key={i++}>Price</td>,
			<td key={i++}>Quantity Ordered</td>,
			<td key={i++}>VendorId</td>,
			<td key={i++}>Order Status</td>
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
