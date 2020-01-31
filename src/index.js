import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import App from "./App";

// Health Check
axios.post("http://localhost:5000/ping").then(() => {
  console.log("Should be working")
}).catch(() => {
  console.log("Not working!");
})

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
