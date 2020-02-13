import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

// class App extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = { apiResponse: "" };
// 	}

// 	callAPI() {
// 		fetch("http://localhost:9000/testAPI")
// 			.then(res => res.text())
// 			.then(res => this.setState({ apiResponse: res }));
// 	}

// 	componentDidMount() {
// 		this.callAPI();
// 	}
// 	render() {
// 		return (
// 			<div className="App">
// 				<header className="App-header">
// 					<img src={logo} className="App-logo" alt="logo" />
// 					<h1 className="App-title">Welcome to React</h1>
// 				</header>
// 				<p className="App-intro">{this.state.apiResponse}</p>
// 			</div>
// 		);
// 	}
// }

// export default App;
class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Navbar />
					<Route exact path="/" component={Landing} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
				</div>
			</Router>
		);
	}
}
export default App;
