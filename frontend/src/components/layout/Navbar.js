import React, { Component } from "react";
import { Link } from "react-router-dom";
import ls from "local-storage";

class Navbar extends Component {
	handleClick(event) {
		event.preventDefault();
		ls.set("auth", "false");
		ls.set("usertype", "");
		ls.set("email", "");
		window.location = "/";
	}
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item active">
							<Link className="nav-link" to="/">
								Home
							</Link>
						</li>
						{ls.get("usertype") === "Vendor" ? (
							<li className="nav-item">
								<Link className="nav-link" to="/addproduct">
									Add Product
								</Link>
							</li>
						) : null}
						{ls.get("usertype") === "Vendor" ? (
							<li className="nav-item">
								<Link className="nav-link" to="/viewproducts">
									List Products
								</Link>
							</li>
						) : null}

						<li className="nav-item">
							<Link className="nav-link" to="#">
								Features
							</Link>
						</li>
						{ls.get("auth") === "true" ? (
							<li className="nav-link">
								<Link
									className="nav-link"
									to="#"
									onClick={this.handleClick}
								>
									LogOut
								</Link>
							</li>
						) : null}
					</ul>

					{ls.get("auth") === "true" ? (
						<ul className="navbar-nav navbar-right">
							<li>Hello {ls.get("username")} !</li>
						</ul>
					) : null}
				</div>
			</nav>
		);
	}
}
export default Navbar;
