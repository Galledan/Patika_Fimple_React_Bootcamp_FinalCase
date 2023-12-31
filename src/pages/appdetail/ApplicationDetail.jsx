import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./appdetail.css";

function ApplicationDetail() {
  const { basvuruNo } = useParams();
  const [application, setApplication] = useState(null);
  const [answer, setAnswer] = useState("");
  const [errorText, setErrorText] = useState("Başvuru detayları yükleniyor...");

  const fetchApplicationDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/savedApplications/${basvuruNo}`
      );
      setApplication(response.data);
      if (application === null) {
        setErrorText(
          "Aradığınız başvuru bulunamadı, lütfen başvuru numaranızı kontrol ediniz!"
        );
      }
    } catch (error) {
      console.error("Başvuru detayları getirme hatası:", error);
    }
  };

  const checkAnswer = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/savedAnswers/${basvuruNo}`
      );
      setAnswer(res.data);
    } catch (error) {
      console.error("Cevap bulunamadı:", error);
    }
  };

  useEffect(() => {
    checkAnswer()
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
            {answer === "" && (
              <div>
                <p>
                  Başvurunuz henüz yanıtlanmamıştır lütfen daha sonra tekrar
                  deneyiniz
                </p>
              </div>
            )}
            {answer !== "" && (
              <div>
               <p>{answer.answer}</p> 
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicationDetail;
