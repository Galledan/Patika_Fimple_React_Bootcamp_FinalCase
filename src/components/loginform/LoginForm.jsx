import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function LoginForm({setIsLoggedIn}) {
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
        console.log("Login successful", values);
        setIsLoggedIn(true)
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

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
