import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ls from "local-storage";

class AddProduct extends Component {
	constructor() {
		super();
		this.state = {
			name: "",
			price: "",
			quantity: "",
			vendormail: "",
			errors: {}
		};
	}
	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};
	onSubmit = e => {
		e.preventDefault();
		const newProduct = {
			name: this.state.name,
			price: this.state.price,
			quantity: this.state.quantity,
			vendormail: ls.get("email")
		};
		console.log(newProduct);
		axios
			.post("product/create", newProduct)
			.then(function(res) {
				alert("Product Added Successfully");
				window.location.reload();
			})
			.catch(function(res) {
				alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
	};
	render() {
		const { errors } = this.state;
		return (
			<div className="container">
				<div className="row">
					<div className="col s8 offset-s2">
						<Link to="/" className="btn-flat waves-effect">
							<i className="material-icons left">
								keyboard_backspace
							</i>{" "}
							Back to home
						</Link>
						<div
							className="col s12"
							style={{ paddingLeft: "11.250px" }}
						>
							<h4>
								<b>Add Product</b>
							</h4>
						</div>
						<form noValidate onSubmit={this.onSubmit}>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.name}
									error={errors.name}
									id="name"
									type="text"
								/>
								<label htmlFor="name">Product Name</label>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.price}
									error={errors.price}
									id="price"
									type="text"
								/>
								<label htmlFor="price">Price</label>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.quantity}
									error={errors.quantity}
									id="quantity"
									type="text"
								/>
								<label htmlFor="quantity">Quantity</label>
							</div>
							<div
								className="col s12"
								style={{ paddingLeft: "11.250px" }}
							>
								<button
									style={{
										width: "150px",
										borderRadius: "3px",
										letterSpacing: "1.5px",
										marginTop: "1rem"
									}}
									type="submit"
									className="btn btn-large waves-effect waves-light hoverable blue accent-3"
								>
									Add Product
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default AddProduct;
