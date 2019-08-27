import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { StoreProvider } from "./store";
import Header from "./components/Header";
import Practice from "./pages/Practice";
import Stats from "./pages/Stats";
import WordList from "./pages/WordList";

import "./App.css";

const App = () => {
  return (
    <Router>
      <StoreProvider>
        <main className="container">
          <Header />

          <Route exact path="/" component={Practice} />
          <Route path="/stats" component={Stats} />
          <Route path="/words" component={WordList} />
        </main>
      </StoreProvider>
    </Router>
  );
};

export default App;
