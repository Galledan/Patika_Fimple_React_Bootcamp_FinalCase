import React from "react";
import { useApplication } from "../../context/ApplicationContext";
import Application from "../application/Application";
import "./applist.css"


function ApplicationList() {
  const { applications } = useApplication();


  return (
    <div className="application-list-container">
      <h2>Başvuru Listesi:</h2>
      {applications.map((app) => (
        <Application
          firstName={app.firstName}
          lastName={app.lastName}
          applicationReason={app.applicationReason}
          applicationDate={app.applicationDate}
          attachments={app.attachments}
          id={app.id}
          status={app.status}
        />
      ))}
    </div>
  );
}

export default ApplicationList;
