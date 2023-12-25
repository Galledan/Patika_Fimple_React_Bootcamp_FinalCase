import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import ApplicationCreate from "./pages/appcreate/ApplicationCreate";
import ApplicationSuccess from "./pages/appsuccess/ApplicationSuccess";
import ApplicationStatus from "./pages/appstatus/ApplicationStatus";
import ApplicationDetailPage from "./pages/appdetail/ApplicationDetail";
import AdminPanel from "./pages/adminpanel/AdminPanel";
import AdminApplicationDetailPage from "./pages/adminappdetail/AdminApplicationDetail";
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/basvuru-olustur" replace />,
    },
    {
      path: "/basvuru-olustur",
      element: <ApplicationCreate />,
    },
    {
      path: "/basvuru-basarili",
      element: <ApplicationSuccess />,
    },
    {
      path: "/basvuru-sorgula",
      element: <ApplicationStatus />,
    },
    {
      path: "/basvuru/:basvuruNo",
      element: <ApplicationDetailPage />,
    },
    {
      path: "/admin",
      element: <AdminPanel />,
    },
    {
      path: "/admin/basvuru-listesi",
      element: <AdminPanel />,
    },
    {
      path: "/admin/basvuru/:basvuruNo",
      element: <AdminApplicationDetailPage />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
