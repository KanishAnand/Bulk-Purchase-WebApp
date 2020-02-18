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
import MyOrders from "./components/MyOrders";
import Dispatch from "./components/product/DispatchProduct";
import Dispatched from "./components/product/Dispatched";
import Rate from "./components/product/Rate";
import SeeRating from "./components/product/SeeRating";
import VendorReview from "./components/product/VendorReview";
import RateVendor from "./components/product/RateVendor";
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
					<Route exact path="/myorders" component={MyOrders} />
					<Route exact path="/dispatch" component={Dispatch} />
					<Route exact path="/dispatched" component={Dispatched} />
					<Route exact path="/rate" component={Rate} />
					<Route exact path="/seerating" component={SeeRating} />
					<Route exact path="/ratevendor" component={RateVendor} />
					<Route
						exact
						path="/vendoreviews"
						component={VendorReview}
					/>
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
