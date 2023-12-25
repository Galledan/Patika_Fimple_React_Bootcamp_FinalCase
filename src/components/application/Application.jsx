import React from "react";

function Application({
  firstName,
  lastName,
  age,
  tcNumber,
  applicationReason,
  address,
  attachments,
  id,
  status
}) {
  return (
    <div className="application-container">
        <div className="applicant-info">
        <p className="applicant-name">{firstName} {lastName}</p>
        <p className="applicant-age">{age}</p>
        <p className="applicant-tcNumber">{tcNumber}</p>
        </div>
        <div className="application-info">
            <p className="application-reason">{applicationReason}</p>
        </div>
        <div className="rest">
            <p>{address}</p>
            <img src={attachments} alt={id} />
            <p>{status}</p>
        </div>
    </div>
  );
}

export default Application;
