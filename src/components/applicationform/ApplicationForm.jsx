import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import shortUUID from "short-uuid";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  firstName: Yup.string().required("Bu alan zorunludur").matches(/^[A-Za-zşŞıİçÇöÖüÜĞğ ]+$/, "Geçerli bir isim giriniz"),
  lastName: Yup.string().required("Bu alan zorunludur").matches(/^[A-Za-zşŞıİçÇöÖüÜĞğ ]+$/, "Geçerli bir isim giriniz"),
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
      id: shortUUID.generate(),
      status: "pending"
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/saveApplication",
          values
        );
        console.log(response.data);
        navigate("/basvuru-basarili", {state: {id: values.id}})
      } catch (error) {
        console.error("Veri gönderme hatası:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Ad</label>
        <input
          type="text"
          name="firstName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <p>{formik.errors.firstName}</p>
        )}
      </div>

      <div>
        <label>Soyad</label>
        <input
          type="text"
          name="lastName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <p>{formik.errors.lastName}</p>
        )}
      </div>

      <div>
        <label>Yaş</label>
        <input
          type="number"
          name="age"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.age}
        />
        {formik.touched.age && formik.errors.age && <p>{formik.errors.age}</p>}
      </div>

      <div>
        <label>TC Kimlik Numarası</label>
        <input
          type="text"
          name="tcNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.tcNumber}
        />
        {formik.touched.tcNumber && formik.errors.tcNumber && (
          <p>{formik.errors.tcNumber}</p>
        )}
      </div>

      <div>
        <label>Başvuru Nedeni</label>
        <textarea
          name="applicationReason"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.applicationReason}
        />
        {formik.touched.applicationReason &&
          formik.errors.applicationReason && (
            <p>{formik.errors.applicationReason}</p>
          )}
      </div>

      <div>
        <label>Adres Bilgisi</label>
        <textarea
          name="address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
        />
        {formik.touched.address && formik.errors.address && (
          <p>{formik.errors.address}</p>
        )}
      </div>

      <div>
        <label>Fotoğraf/Ekler</label>
        <input
          type="file"
          name="attachments"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.attachments}
        />
        {formik.touched.attachments && formik.errors.attachments && (
          <p>{formik.errors.attachments}</p>
        )}
      </div>

      <div>
        <button type="submit">Başvuruyu Gönder</button>
      </div>
    </form>
  );
};

export default ApplicationForm;
