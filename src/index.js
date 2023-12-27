import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApplicationProvider } from "./context/ApplicationContext";
import { AuthProvider } from "react-use-auth";
import "./index.css";
import "./reset.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider   navigate={(navigate) => (path) => navigate(path)}
  auth0_domain="dev-zy13mdnoq08ogwun.eu.auth0.com"
  auth0_client_id="qOrZaivQZagLhFQbA1foDqIzOXo9oVPi">
    <ApplicationProvider>
      <App />
    </ApplicationProvider>
  </AuthProvider>
);
