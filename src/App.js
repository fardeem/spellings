import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Practice from "./pages/Practice";

import "./App.css";

const Stats = () => <h1>Hello World</h1>;

const App = () => {
  return (
    <Router>
      <main className="container">
        <nav>
          <Link to="/">Practice</Link>
          <Link to="/stats">Stats</Link>
        </nav>

        <Route exact path="/" component={Practice} />
        <Route path="/stats" component={Stats} />
      </main>
    </Router>
  );
};

export default App;
