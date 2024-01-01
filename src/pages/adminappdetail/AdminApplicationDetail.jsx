import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AdminApplicationDetail() {
  const { basvuruNo } = useParams();
  const [answer, setAnswer] = useState("");
  const [application, setApplication] = useState("");
  const navigate = useNavigate()

  const fetchApplicationDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/savedApplications/${basvuruNo}`
      );
      setApplication(response.data);
    } catch (error) {
      console.error("Başvuru detayları getirme hatası:", error);
      
    }
  };

  const handleSaveAnswer = async () => {
    try {
      await axios.post("http://localhost:3001/api/saveAnswer", {
        id: basvuruNo,
        answer,
      });

      console.log("Cevap başarıyla kaydedildi.");
      navigate("/admin/basvuru-listesi")
    } catch (error) {
      console.error("Cevap kaydetme hatası", error);
    }
  };

  useEffect(() => {
    fetchApplicationDetail();
  },[])

  return (
    <div>
      <h2>Admin Başvuru Detay Sayfası</h2>
      <div className="admin-applicant-info">
        <p className="admin-applicant-name">
          Başvuran Adı Soyadı:{application.firstName} {application.lastName}
        </p>
        <p>
          Başvuru Tarihi:
          {application.applicationDate}
        </p>
      </div>
      <div className="admin-application-info">
        <p className="admin-application-reason">
          Başvuru Sebebi: {application.applicationReason}
        </p>
        <p>{application.attachments}</p>
      </div>
      <div>
        <label>Cevap:</label>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>
      <button onClick={handleSaveAnswer}>Cevapla</button>
    </div>
  );
}

export default AdminApplicationDetail;