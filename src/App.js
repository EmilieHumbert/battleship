import React from "react";

import Gameboard from "./components/Gameboard";

import "./App.css";

function App() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
      <Gameboard playerNumber={0} size={5} />
      <Gameboard playerNumber={1} size={5} />
    </div>
  );
}

export default App;
