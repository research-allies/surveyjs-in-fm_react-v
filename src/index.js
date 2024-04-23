import MyApp from "./myApp";
import React from "react";
import { createRoot } from "react-dom/client";

window.loadApp = (json) => {
  const obj = JSON.parse(json);
  console.log(obj);
  const container = document.getElementById("root");
  const root = createRoot(container);
  root.render(<MyApp obj={obj} />);
};