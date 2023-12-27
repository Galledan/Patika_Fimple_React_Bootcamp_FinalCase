import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [admins, setAdmins] = useState([]);

  const getAdmins = async () => {
    const res = await axios.get("http://localhost:3001/api/admins");
    setAdmins(res.data);
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const value = { admins, setAdmins };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

const useAdmin = () => {
  const context = useContext(AdminContext);

  return context;
};

export { AdminProvider, useAdmin };
