import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAdmin } from "./context/AdminContext";

const PrivateRoute = ({ element, ...rest }) => {
  const { isLoggedIn } = useAdmin();

  return (
    <Route
      {...rest}
      element={isLoggedIn ? element : <Navigate to="/admin" replace />}
    />
  );
};

export default PrivateRoute;