import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationList from "../../components/applicationlist/ApplicationList";
import LoginForm from "../../components/loginform/LoginForm";

function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleViewApplications = () => {
    navigate("/admin/basvuru-listesi");
  };

  return (
    <div className="admin-panel-container">
      {!isLoggedIn ? <LoginForm setIsLoggedIn={setIsLoggedIn} /> : <ApplicationList />}
    </div>
  );
}

export default AdminPanel;
