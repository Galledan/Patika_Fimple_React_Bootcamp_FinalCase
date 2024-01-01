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
    checkAnswer();
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
          <div className="application">
            <div className="app-header">
              <h1>{application.id} ID'li Başvuru:</h1>
            </div>
            <div className="app-container">
              <div className="applicant-details">
                <p>
                  Başvuran Adı Soyadı: {application.firstName} {application.lastName}
                </p>
                <p>
                  Yaşı: {application.age} 
                </p>
                <p>TC: {application.tcNumber}</p>
              </div>
              <div className="application-reason-container">
                <p className="applcation-reason-header">Başvurunu Nedeni:</p>
                <p className="application-reason">{application.applicationReason}</p>
                <p className="application-attachment">Ekler: {application.attachments}</p>
              </div>
            </div>
          </div>

          <div className="answer-container">
            {answer === "" && (
              <div className="not-answered-container">
                <p>
                  Başvurunuz henüz yanıtlanmamıştır lütfen daha sonra tekrar
                  deneyiniz
                </p>
              </div>
            )}
            {answer !== "" && (
              <div className="answered-container">
                <p className="answered-header">Gelen Cevap:</p>
                <p className="answered-answer">{answer.answer}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicationDetail;
