// App.jsx
import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import RockPaperScissors from "./components/FirstGameStart/RockPaperScissors";

function App() {
  return (
    <>
      <RockPaperScissors />
    </>
  );
}

export default App;
