import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./app.css";
function Application({ firstName, lastName, applicationDate, id }) {
  const [formattedDate, setFormattedDate] = useState("");
  const [status, setStatus] = useState(<i class="fas fa-clock"></i>);

  const navigate = useNavigate();

  const handleShowClick = () => {
    console.log(id);
    navigate(`/admin/basvuru/${id}`);
  };

  const handleDateFormat = (date) => {
    const newDate = new Date(date);
    setFormattedDate(new Date(newDate).toLocaleDateString());
  };

  const checkIsAnswered = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/savedAnswers/${id}`
      );
      if (res.data && res.data.answer) {
        setStatus(<i class="fas fa-check"></i>);
      } else {
        setStatus(<i class="fas fa-clock"></i>);
      }
    } catch (error) {
      console.error("Cevap bulunamadı:", error);
      setStatus("pending");
    }
  };
  const deleteApplicationAndAnswer = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/savedApplications/${id}`);
      console.log("Application deleted successfully.");
    } catch (error) {
      console.error("Başvuru silinemedi");
    }

    try {
      await axios.delete(`http://localhost:3001/api/savedAnswers/${id}`);
      console.log("Answer deleted successfully.");
    } catch (error) {
      console.error("Cevap silinemedi,", error);
    }
  };

  useEffect(() => {
    checkIsAnswered();
    handleDateFormat(applicationDate);
  }, []);
  return (
    <>
      <td>
        {firstName} {lastName}
      </td>
      <td>{formattedDate}</td>
      <td>{id}</td>
      <td className="status-text">{status}</td>
      <td className="table-buttons">
        <button className="showBtn" onClick={() => handleShowClick(id)}>
        <i class="fas fa-eye"></i>
        </button>
        <button
          className="deleteBtn"
          onClick={() => deleteApplicationAndAnswer(id)}
        >
          <i class="fas fa-ban"></i>
        </button>
      </td>
    </>
  );
}

export default Application;
