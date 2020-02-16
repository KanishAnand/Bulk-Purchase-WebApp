import React, { Component } from "react";
import ls from "local-storage";
import axios from "axios";

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

	createTable() {
		let table = [];
		let i = 0;
		let heading = [
			<td key={i++}>Product Name</td>,
			<td key={i++}>Price</td>,
			<td key={i++}>Quantity</td>,
			<td key={i++}>VendorId</td>
		];

		table.push(<tr key={i++}>{heading}</tr>);
		for (const response of this.state.response) {
			let children = [];
			const { name, price, quantity, vendormail } = response;

			children.push(<td key={i++}>{name}</td>);
			children.push(<td key={i++}>{price}</td>);
			children.push(<td key={i++}>{quantity}</td>);
			children.push(<td key={i++}>{vendormail}</td>);
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
export default SearchResult;
