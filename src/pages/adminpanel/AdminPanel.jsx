import React, { useEffect, useState } from "react";
import LoginForm from "../../components/loginform/LoginForm";
import "./adminpanel.css";
import { useAdmin } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";

function AdminPanel() {

  const {isLoggedIn} = useAdmin()
  const navigate = useNavigate() 

  useEffect(() => {
    if(isLoggedIn){
      navigate("/admin/basvuru-listesi")
      console.log("deneme");
    } 

  }, [isLoggedIn])

  return (
    <div className="admin-panel-container">
      <LoginForm />
    </div>
  );
}

export default AdminPanel;
