import React, { useState } from "react";
import ApplicationList from "../../components/applicationlist/ApplicationList";
import LoginForm from "../../components/loginform/LoginForm";

function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
