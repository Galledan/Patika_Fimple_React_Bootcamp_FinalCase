import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ApplicationContext = createContext();

const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);

  const getApplications = async () => {
    const res = await axios.get("http://localhost:3001/api/savedApplications");
    setApplications(res.data);
  };

  useEffect(() => {
    getApplications();
  }, []);

  const value = { applications, setApplications, getApplications };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

const useApplication = () => {
  const context = useContext(ApplicationContext);

  return context;
};

export { ApplicationProvider, useApplication };
