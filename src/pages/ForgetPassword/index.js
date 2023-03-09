import { Button, TextField } from "@mui/material";
import React from "react";
import "./style.css";
import { useFormik } from "formik";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

const ForgetPass = () => {
  const auth = getAuth();

  const initialValues = {
    email: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      sendPasswordResetEmail(auth, formik.values.email)
        .then(() => {
          toast.success("A Link Was Sent to Your Email", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            theme: "light",
          });
        })
        .catch((error) => {
          if (
            error.code.includes("auth/user-not-found") ||
            error.code.includes("auth/missing-email")
          ) {
            toast.error("Please Check Your Email!", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
            });
          }
        });
    },
  });
  return (
    <>
      <ToastContainer />
      <div className="forget-main">
        <div className="forget-inner">
          <h3>Reset Your Password</h3>
          <div className="forget-body">
            <form onSubmit={formik.handleSubmit}>
              <TextField
                className="input"
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <Button type="submit" variant="contained">
                Reset
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPass;
