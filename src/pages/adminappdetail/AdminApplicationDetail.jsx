import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./adminappdetail.css";

function AdminApplicationDetail() {
  const { basvuruNo } = useParams();
  const [answer, setAnswer] = useState("");
  const [application, setApplication] = useState("");
  const navigate = useNavigate();

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
      navigate("/admin/basvuru-listesi");
    } catch (error) {
      console.error("Cevap kaydetme hatası", error);
    }
  };

  useEffect(() => {
    fetchApplicationDetail();
  }, []);

  return (
    <div className="admin-application-detail-container">
      <div className="admin-application">
        <div className="admin-applicant-info">
          <p>Başvuru ID'si: {application.id}</p>
          <p className="admin-applicant-name">
            Başvuran Adı Soyadı: {application.firstName} {application.lastName}
          </p>
          <p>Yaşı: {application.age}</p>
          <p>TC Numarası: {application.tcNumber}</p>
          <p>Adresi: {application.address}</p>
          <p>
            Başvuru Tarihi: {application.applicationDate}
          </p>
        </div>
        <div className="admin-application-info">
          <p>Başvuru Sebebi:</p>
          <p className="admin-application-reason">
             {application.applicationReason}
          </p>
          <p>Ekler: {application.attachments}</p>
        </div>
      </div>

      <div className="admin-application-answer">
        <textarea
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Cevabınızı yazınız..."
        />
        <button onClick={handleSaveAnswer}>Cevapla</button>
      </div>
    </div>
  );
}

export default AdminApplicationDetail;
