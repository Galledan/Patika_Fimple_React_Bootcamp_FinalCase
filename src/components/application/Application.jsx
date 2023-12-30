import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./app.css";
function Application({
  firstName,
  lastName,
  applicationReason,
  attachments,
  applicationDate,
  id,
  status,
}) {
  const [formattedDate, setFormattedDate] = useState("");
  const [statusClass, setStatusClass] = useState("");

  const navigate = useNavigate();

  const handleApplicationClick = () => {
    console.log(id);
    navigate(`/admin/basvuru/${id}`);
  };

  const handleDateFormat = (date) => {
    const newDate = new Date(date);
    setFormattedDate(new Date(newDate).toLocaleDateString());
  };

  const getStatusClass = () => {
    switch (status) {
      case "pending":
        return "pending";
      case "answered":
        return "answered";
      case "rejected":
        return "rejected";
      default:
        return "";
    }
  };

  useEffect(() => {
    handleDateFormat(applicationDate);
  }, []);

  useEffect(() => {
    setStatusClass(getStatusClass());
  }, [status]);

  return (
    <div className={`application-container ${statusClass}`}>
      <div className="applicant-info">
        <p className="applicant-name">
          Başvuran Adı Soyadı:{firstName} {lastName}
        </p>
        <p>
          Başvuru Tarihi:
          {formattedDate}
        </p>
      </div>
      <div className="application-info">
        <p className="application-reason">
          Başvuru Sebebi: {applicationReason}
        </p>
        <p>{attachments}</p>
      </div>
      <div className="application-show-button">
        <button onClick={handleApplicationClick}>Görüntüle</button>
      </div>
    </div>
  );
}

export default Application;
