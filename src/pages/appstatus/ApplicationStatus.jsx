import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./appstatus.css";

const ApplicationStatus = () => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setError("");
  };

  const handleCheckStatus = async () => {
    try {
      if (inputValue.trim() === "") {
        setError("Lütfen bir ID girin.");
        return;
      }
      const response = await axios.get(
        `http://localhost:3001/api/savedApplications/${inputValue}`
      );

      if (response.data) {
        navigate(`/basvuru/${inputValue}`);
      } else {
        setError("Belirtilen ID ile ilgili başvuru bulunamadı.");
      }
    } catch (error) {
      console.error("Başvuru durumu sorgulama hatası:", error);
      setError("Başvuru durumu sorgulanırken bir hata oluştu.");
    }
  };

  return (
    <div className="app-status-container">
      <div className="app-status">
        <h1>Başvuru Durumunu Sorgula</h1>
        <div className="status-entry">
          <input type="text" value={inputValue} onChange={handleInputChange} placeholder="ID'nizi giriniz" />
        </div>
        <button onClick={handleCheckStatus}>Sorgula</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default ApplicationStatus;
