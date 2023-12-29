import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./appdetail.css";

function ApplicationDetail() {
  const { basvuruNo } = useParams();
  const [application, setApplication] = useState(null);
  const [errorText, setErrorText] = useState("Başvuru detayları yükleniyor...");

  const fetchApplicationDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/savedApplications/${basvuruNo}`
      );
      setApplication(response.data);
      if(application === null) {
        setErrorText("Aradığınız başvuru bulunamadı, lütfen başvuru numaranızı kontrol ediniz!")
      };
    } catch (error) {
      console.error("Başvuru detayları getirme hatası:", error);
      
    }
  };

  useEffect(() => {
    fetchApplicationDetail();
  }, [basvuruNo]);

  return (
    <div className="application-detail-container">
      {!application && (
        <div className="pending">
          <p>{errorText}</p>
        </div>
      )}
      {application && (
        <div className="application-details">
          <div className="app-container">
            <div className="applicant-details">
              <p>
                Başvuran Adı Soyadı: {application.firstName}{" "}
                {application.lastName}
              </p>
              <p>
                Yaşı: {application.age} TC: {application.tcNumber}{" "}
              </p>
            </div>
            <div className="application-details">
              <p>Başvurunu Nedeni:</p>
              <p>{application.applicationReason}</p>
            </div>
          </div>
          <div className="answer-container">
            {application.status === "pending" && (
              <div>
                <p>
                  Başvurunuz henüz yanıtlanmamıştır lütfen daha sonra tekrar
                  deneyiniz
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicationDetail;
