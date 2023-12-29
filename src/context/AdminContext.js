import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/isLoggedIn");
        setIsLoggedIn(response.data.success);
      } catch (error) {
        console.error("Login status check failed", error);
      }
    };

    checkLoginStatus();
  }, []);

  const value = { isLoggedIn, setIsLoggedIn };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

const useAdmin = () => {
  const context = useContext(AdminContext);

  return context;
};

export { AdminProvider, useAdmin };
