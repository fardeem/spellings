import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { StoreProvider } from "./store";
import Header from "./components/Header";
import Practice from "./pages/Practice";

import "./App.css";

const Stats = () => <h1>Hello World</h1>;

const App = () => {
  return (
    <Router>
      <StoreProvider>
        <main className="container">
          <Header />

          <Route exact path="/" component={Practice} />
          <Route path="/stats" component={Stats} />
        </main>
      </StoreProvider>
    </Router>
  );
};

export default App;
