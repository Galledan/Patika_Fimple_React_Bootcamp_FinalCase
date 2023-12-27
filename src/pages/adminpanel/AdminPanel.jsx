import React, { useState } from "react";
import ApplicationList from "../../components/applicationlist/ApplicationList";
import LoginForm from "../../components/loginform/LoginForm";
import { useAuth } from "react-use-auth";

function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div className="admin-panel-container">
      {!isLoggedIn ? (
        <LoginForm setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <ApplicationList />
      )}
    </div>
  );
}

export default AdminPanel;
