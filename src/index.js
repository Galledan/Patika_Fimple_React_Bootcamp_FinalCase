import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApplicationProvider } from "./context/ApplicationContext";
import { AdminProvider } from "./context/AdminContext";
import "./index.css";
import "./reset.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AdminProvider>
    <ApplicationProvider>
      <App />
    </ApplicationProvider>
  </AdminProvider>
);
