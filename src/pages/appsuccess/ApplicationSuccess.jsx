import React from "react";
import { useLocation } from "react-router-dom";
import "./appsuccess.css";

function ApplicationSuccess() {
  const location = useLocation();
  const createdApplicationId = location.state?.id;

  return (
    <div className="application-success-container">
      <div className="success-text">
        <p>
          Başvurunuz için teşekkür ederiz başvuru sorgula sekmesinden aşağıdaki
          kodu girerek başvurunuzun durumunu kontrol edebilirsiniz.
        </p>
        <p>Kodunuz: </p>
        <p>{createdApplicationId}</p>
      </div>
    </div>
  );
}

export default ApplicationSuccess;
