import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./style.css";
import { signUp } from "./../../validation/validation";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import { Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";

const Registration = () => {
  const [passwordShow, setPasswordShow] = useState("password");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const db = getDatabase();

  const handlepass = () => {
    if (passwordShow === "password") {
      setPasswordShow("text");
    } else {
      setPasswordShow("password");
    }
  };

  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signUp,
    onSubmit: () => {
      setLoading(true);
      createUserWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(({ user }) => {
          updateProfile(auth.currentUser, {
            displayName: formik.values.fullname,
          }).then(() => {
            formik.resetForm();
            setLoading(false);
            navigate("/login");
            sendEmailVerification(auth.currentUser).then(() => {
              set(ref(db, "users/" + user.uid), {
                username: user.displayName,
                email: user.email,
              }).then(() => {
                toast.success("Successful!", {
                  position: "bottom-center",
                  autoClose: 1000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  theme: "light",
                });
              });
            });
          });
        })
        .catch((error) => {
          if (error.code.includes("auth/email-already-in-use")) {
            toast.error("Email Already Used", {
              position: "bottom-center",
              autoClose: 1000,
              hideProgressBar: true,
              theme: "light",
            });
            setLoading(false);
          }
        });
    },
  });

  return (
    <div>
      <Container fixed>
        <ToastContainer />
        <Grid container spacing={2} className="registration-main">
          <Grid item xs={6} className="registration-left">
            <h3>Get started with easily register</h3>
            <h6>Free register and you can enjoy it</h6>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                className="input"
                label="Enter Full name"
                variant="outlined"
                onChange={formik.handleChange}
                name="fullname"
                value={formik.values.fullname}
              />
              {formik.errors.fullname && formik.touched.fullname ? (
                <p className="error-message">{formik.errors.fullname}</p>
              ) : null}
              <TextField
                className="input"
                label="Enter email"
                variant="outlined"
                onChange={formik.handleChange}
                name="email"
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email ? (
                <p className="error-message">{formik.errors.email}</p>
              ) : null}
              <div className="password-box">
                <TextField
                  className="input"
                  label="Password"
                  variant="outlined"
                  type={passwordShow}
                  onChange={formik.handleChange}
                  name="password"
                  value={formik.values.password}
                />
                <div className="eye-icon" onClick={handlepass}>
                  {passwordShow === "password" ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </div>
              </div>
              {formik.errors.password && formik.touched.password ? (
                <p className="error-message">{formik.errors.password}</p>
              ) : null}
              <TextField
                className="input"
                label="Confirm Password"
                variant="outlined"
                type={passwordShow}
                onChange={formik.handleChange}
                name="confirmPassword"
                value={formik.values.confirmPassword}
              />
              {formik.errors.confirmPassword &&
              formik.touched.confirmPassword ? (
                <p className="error-message">{formik.errors.confirmPassword}</p>
              ) : null}
              {loading ? (
                <Button
                  disabled
                  className="btn"
                  variant="contained"
                  type="submit"
                >
                  <BeatLoader />
                </Button>
              ) : (
                <Button className="btn" variant="contained" type="submit">
                  Sign Up
                </Button>
              )}
            </form>
            <h6>
              Already have an account ? <Link to="/login">Sign In</Link>
            </h6>
          </Grid>
          <Grid item xs={6} className="registration-right">
            <picture>
              <img
                src="./images/registration.png"
                alt="registration-pic"
                className="regi-pic"
              />
            </picture>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Registration;
