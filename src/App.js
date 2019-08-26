import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Header from "./components/Header";
import Practice from "./pages/Practice";

import "./App.css";

const Stats = () => <h1>Hello World</h1>;

const App = () => {
  return (
    <Router>
      <main className="container">
        <Header />

        <Route exact path="/" component={Practice} />
        <Route path="/stats" component={Stats} />
      </main>
    </Router>
  );
};

export default App;
