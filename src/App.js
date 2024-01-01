import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ApplicationCreate from "./pages/appcreate/ApplicationCreate";
import ApplicationSuccess from "./pages/appsuccess/ApplicationSuccess";
import ApplicationStatus from "./pages/appstatus/ApplicationStatus";
import ApplicationDetailPage from "./pages/appdetail/ApplicationDetail";
import AdminPanel from "./pages/adminpanel/AdminPanel";
import AdminApplicationDetail from "./pages/adminappdetail/AdminApplicationDetail";
import ApplicationList from "./pages/applicationlist/ApplicationList";
import ProtectedComponent from "./ProtectedRoute";
import { ApplicationProvider } from "./context/ApplicationContext";
import { AdminProvider } from "./context/AdminContext";
import { ToastProvider } from 'react-toast-notifications';
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <Router>
      <AdminProvider>
        <ApplicationProvider>
        <ToastProvider placement= "bottom-center">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/basvuru-olustur" replace />}
            />
            <Route path="/basvuru-olustur" element={<ApplicationCreate />} />
            <Route path="/basvuru-basarili" element={<ApplicationSuccess />} />
            <Route path="/basvuru-sorgula" element={<ApplicationStatus />} />
            <Route
              path="/basvuru/:basvuruNo"
              element={<ApplicationDetailPage />}
            />
            <Route path="/admin" element={<AdminPanel />} />
            <Route
              path="/admin/basvuru-listesi"
              element={
                <ProtectedComponent>
                  <ApplicationList />
                </ProtectedComponent>
              }
            />
            <Route
              path="/admin/basvuru/:basvuruNo"
              element={
                <ProtectedComponent>
                  <AdminApplicationDetail />
                </ProtectedComponent>
              }
            />
          </Routes>
          </ToastProvider>
        </ApplicationProvider>
      </AdminProvider>
    </Router>
  );
}

export default App;
