import React from "react";
import LoginForm from "../../components/loginform/LoginForm";
import "./adminpanel.css";
function AdminPanel() {
  return (
    <div className="admin-panel-container">
      <LoginForm />
    </div>
  );
}

export default AdminPanel;
