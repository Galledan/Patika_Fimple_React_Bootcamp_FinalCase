import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApplicationProvider } from "./context/ApplicationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApplicationProvider>
    <App />
  </ApplicationProvider>
);
