import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from './context/AdminContext';

const ProtectedComponent = ({ children }) => {
  const { isLoggedIn } = useAdmin();

  if (!isLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedComponent;
