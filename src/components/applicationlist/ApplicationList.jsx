import React from "react";
import { useApplication } from "../../context/ApplicationContext";
import Application from "../application/Application";

function ApplicationList() {
  const { applications } = useApplication();

  return (
    <div className="application-list-container">
      {applications.map((app) => (
        <Application
          firstName={app.firstName}
          lastName={app.lastName}
          age={app.age}
          tcNumber={app.tcNumber}
          applicationReason={app.applicationReason}
          address={app.address}
          attachments={app.attachments}
          id={app.id}
          status={app.status}
        />
      ))}
    </div>
  );
}

export default ApplicationList;
