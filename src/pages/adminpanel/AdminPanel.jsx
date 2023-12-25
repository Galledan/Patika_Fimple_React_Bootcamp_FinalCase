import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationList from "../../components/applicationlist/ApplicationList";

function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
      {!isLoggedIn ? (
        <div>
          Login Kısmı
        </div>
      ) :
      
      <ApplicationList />}
    </div>
  );
}

export default AdminPanel;
