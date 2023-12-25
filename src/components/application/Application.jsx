import React from "react";
import { useNavigate } from "react-router-dom";

function Application({
  firstName,
  lastName,
  age,
  tcNumber,
  applicationReason,
  address,
  attachments,
  id,
  status,
}) {
  const navigate = useNavigate();

  const handleApplicationClick = () => {
    console.log(id);
    navigate(`/admin/basvuru/${id}`);
    
  };

  return (
    <div  className="application-container">
      <div className="applicant-info">
        <p className="applicant-name">
          {firstName} {lastName}
        </p>
        <p className="applicant-age">{age}</p>
        <p className="applicant-tcNumber">{tcNumber}</p>
      </div>
      <div className="application-info">
        <p className="application-reason">{applicationReason}</p>
      </div>
      <div className="rest">
        <p>{address}</p>
        <p>{attachments}</p>
        <p>{id}</p>
        <p>{status}</p>
        <button onClick={handleApplicationClick}>Görüntüle</button>
      </div>
    </div>
  );
}

export default Application;
