import React from "react";
import { useLocation } from "react-router-dom";
import "./appsuccess.css";
import { useToasts } from "react-toast-notifications";

function ApplicationSuccess() {
  const location = useLocation();
  const createdApplicationId = location.state?.id;
  const { addToast } = useToasts();

  const copyText = () => {
    navigator.clipboard.writeText(createdApplicationId);
    addToast("ID kopyalandı", { appearance: "success" });
  };

  return (
    <div className="application-success-container">
      <div className="success-text">
        <p>
          Başvurunuz için teşekkür ederiz başvuru sorgula sekmesinden aşağıdaki
          kodu girerek başvurunuzun durumunu kontrol edebilirsiniz.
        </p>
        <p>Kodunuz: </p>
        <div onClick={() => copyText()}>
          <i class="fas fa-copy"></i>
          <p> {createdApplicationId} </p>
        </div>
      </div>
    </div>
  );
}

export default ApplicationSuccess;
