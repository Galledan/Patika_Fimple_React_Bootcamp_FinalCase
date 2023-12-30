import React, { useEffect } from "react";
import LoginForm from "../../components/loginform/LoginForm";
import "./adminpanel.css";
import { useAdmin } from "../../context/AdminContext";
function AdminPanel() {
  
 

  useEffect(() => {
    
  })
  return (
    <div className="admin-panel-container">
      <LoginForm />
    </div>
  );
}

export default AdminPanel;
