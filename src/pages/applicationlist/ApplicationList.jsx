import React, { useEffect } from "react";
import { useApplication } from "../../context/ApplicationContext";
import Application from "../../components/application/Application";
import "./applist.css";

function ApplicationList() {
  const { applications, getApplications } = useApplication();

  useEffect(() => {
    getApplications()
  }, [applications])

  return (
    <div className="application-list-container">
      <div className="applications-container">
        <h2>Başvuru Listesi:</h2>
        <table className="application-table">
          <thead>
            <tr>
              <th>Ad Soyad</th>
              <th>Tarih</th>
              <th>ID</th>
              <th>Status</th>
              <th>Aksiyon</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <Application
                  firstName={app.firstName}
                  lastName={app.lastName}
                  applicationReason={app.applicationReason}
                  applicationDate={app.applicationDate}
                  id={app.id}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ApplicationList;
