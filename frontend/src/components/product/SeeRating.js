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
			.post("product/seerating", data)
			.then(res => {
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
			<td key={i++}>User Id</td>,
			<td key={i++}>Rating</td>,
			<td key={i++}>Reviews</td>
		];
		table.push(<tr key={i++}>{heading}</tr>);
		for (const response of this.state.response) {
			let children = [];
			const { name, usermail, rating, review } = response;

			children.push(
				<td id={i} key={i++}>
					{name}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{usermail}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{rating}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{review}
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
