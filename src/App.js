import React from "react";

import "./App.css";

import Player from "./components/Player";
import Form from "./components/Form";

const App = () => {
  return (
    <div className="container">
      <Player word="Extravagance" />

      <Form />
    </div>
  );
};

export default App;
