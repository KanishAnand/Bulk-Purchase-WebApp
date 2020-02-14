import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
	render() {
		return (
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item active">
							<a class="nav-link" href="#">
								Home
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">
								Features
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">
								Products
							</a>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}
export default Navbar;
