import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAdmin } from "../../context/AdminContext";
import axios from "axios";
function LoginForm({ setIsLoggedIn }) {
  const { admins } = useAdmin();

  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        values
      );

      if (response.data.success) {
        console.log("Login successful");
        setIsLoggedIn(true);
      } else {
        console.error("Login failed", response.data.error);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleViewApplications = () => {
    navigate("/admin/basvuru-listesi");
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const foundAdmin = admins.find(
          (admin) =>
            admin.username === values.username &&
            admin.password === values.password
        );

        if (foundAdmin) {
          console.log("Login successful", values);
          handleLogin(values);
          handleViewApplications();
        } else {
          console.error("Invalid username or password");
          setLoginError("Invalid username or password");
        }
      } catch (error) {
        console.error("Login failed", error);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          id="username"
          {...formik.getFieldProps("username")}
        />
        {formik.touched.username && formik.errors.username && (
          <div>{formik.errors.username}</div>
        )}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          id="password"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password && (
          <div>{formik.errors.password}</div>
        )}
      </div>
      {loginError && <div>{loginError}</div>}
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
