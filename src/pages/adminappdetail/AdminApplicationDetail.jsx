import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AdminApplicationDetail() {
  const { basvuruNo } = useParams();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const fetchApplicationDetail = async () => {
      try {
        const response = await axios.get(`/api/savedApplications/${basvuruNo}`);
        setApplication(response.data);
      } catch (error) {
        console.error("Başvuru detayları getirilemedi", error);
      }
    };

    fetchApplicationDetail();
  }, [basvuruNo]);

  const handleSave = async () => {
    try {
    
      const updatedApplication = { ...application, status: "answered" };
      const response = await axios.post("/api/updateApplication", updatedApplication);
      console.log(response.data);

      const updatedResponse = await axios.get(`/api/savedApplications/${basvuruNo}`);
      setApplication(updatedResponse.data);
    } catch (error) {
      console.error("Başvuru bilgileri güncellenemedi", error);
    }
  };

  if (!application) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-application-detail-container">
      <h2>Başvuru Detayları</h2>
      <button onClick={handleSave}>Bilgileri Kaydet</button>
    </div>
  );
}

export default AdminApplicationDetail;