import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ls from "local-storage";

import "./App.css";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Welcome from "./components/Welcome";
import AddProduct from "./components/product/AddProduct";
import ViewProduct from "./components/product/ViewProduct";
import SearchResult from "./components/search/Result";

// class App
class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Navbar />
					{ls.get("auth") === "true" ? (
						<Route exact path="/" component={Welcome} />
					) : (
						<Route exact path="/" component={Landing} />
					)}
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/addproduct" component={AddProduct} />
					<Route exact path="/viewproducts" component={ViewProduct} />
					<Route
						exact
						path="/searchresult"
						component={SearchResult}
					/>
				</div>
			</Router>
		);
	}
}
export default App;
