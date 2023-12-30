import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkLoginStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        console.log("token exist");
        setIsLoggedIn(true);
        navigate("/admin/basvuru-listesi")
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Login status check failed", error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
  

    checkLoginStatus();
  }, [isLoggedIn]);

  const value = { isLoggedIn, setIsLoggedIn, checkLoginStatus };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

export { AdminProvider, useAdmin };
