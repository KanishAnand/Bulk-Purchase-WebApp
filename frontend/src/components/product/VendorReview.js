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
		const data = { vendormail: ls.get("vendormail") };
		axios
			.post("/product/vendoreviews", data)
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
		let heading = [<td key={i++}>Vendor Reviews</td>];

		table.push(<tr key={i++}>{heading}</tr>);
		for (const response of this.state.response) {
			let children = [];
			const { review } = response;

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
			<div>
				<table>
					<tbody>{table}</tbody>
				</table>
			</div>
		);
	}
}
export default SearchResult;
