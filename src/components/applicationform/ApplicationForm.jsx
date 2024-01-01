import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./appform.css";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("Bu alan zorunludur")
    .matches(/^[A-Za-zşŞıİçÇöÖüÜĞğ ]+$/, "Geçerli bir isim giriniz"),
  lastName: Yup.string()
    .required("Bu alan zorunludur")
    .matches(/^[A-Za-zşŞıİçÇöÖüÜĞğ ]+$/, "Geçerli bir isim giriniz"),
  age: Yup.number()
    .required("Bu alan zorunludur")
    .min(18, "18 yaşından küçük olamaz"),
  tcNumber: Yup.string()
    .required("Bu alan zorunludur")
    .matches(/^\d{11}$/, "Geçerli bir TC Kimlik Numarası giriniz"),
  applicationReason: Yup.string().required("Bu alan zorunludur"),
  address: Yup.string().required("Bu alan zorunludur"),
  attachments: Yup.string().required("Bu alan zorunludur"),
});

const ApplicationForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      age: "",
      tcNumber: "",
      applicationReason: "",
      address: "",
      attachments: "",
      status: "pending",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/saveApplication",
          values
        );
        const updatedValues = { ...values, id: response.data.id };
        console.log(response.data);
        navigate("/basvuru-basarili", { state: { id: response.data.id } });
      } catch (error) {
        console.error("Veri gönderme hatası:", error);
      }
    },
  });

  return (
    <div className="form-container">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-names">
          <div className="form-fname">
            <label>Ad</label>
            <input
              type="text"
              name="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              placeholder="Adınızı giriniz"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p>{formik.errors.firstName}</p>
            )}
          </div>

          <div className="form-lname">
            <label>Soyad</label>
            <input
              type="text"
              name="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              placeholder="Soyadınızı giriniz"
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p>{formik.errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="form-numbers">
          <div className="form-age">
            <label>Yaş</label>
            <input
              type="number"
              name="age"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
              placeholder="Yaşınızı giriniz"
            />
            {formik.touched.age && formik.errors.age && (
              <p>{formik.errors.age}</p>
            )}
          </div>

          <div className="form-tc">
            <label>TC Kimlik Numarası</label>
            <input
              type="text"
              name="tcNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tcNumber}
              placeholder="TC numaranızı giriniz"
            />
            {formik.touched.tcNumber && formik.errors.tcNumber && (
              <p>{formik.errors.tcNumber}</p>
            )}
          </div>
        </div>

        <div className="form-reason">
          <label>Başvuru Nedeni</label>
          <textarea
            name="applicationReason"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.applicationReason}
            placeholder="Başvuru sebebiniz..."
          />
          {formik.touched.applicationReason &&
            formik.errors.applicationReason && (
              <p>{formik.errors.applicationReason}</p>
            )}
        </div>

        <div className="form-address">
          <label>Adres Bilgisi</label>
          <textarea
            name="address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            placeholder="Adresiniz..."
          />
          {formik.touched.address && formik.errors.address && (
            <p>{formik.errors.address}</p>
          )}
        </div>

        <div className="form-attachment">
          <label>Fotoğraf/Ekler</label>
          <div className="attachment-input">
            <input
              type="file"
              name="attachments"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.attachments}
            />
            <p>Dosyalarınızı buraya sürekleyin veya buraya tıklayın.</p>
          </div>

          {formik.touched.attachments && formik.errors.attachments && (
            <p>{formik.errors.attachments}</p>
          )}
        </div>

        <div className="form-button">
          <button className="submit-btn" type="submit">
            Başvuruyu Gönder
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
