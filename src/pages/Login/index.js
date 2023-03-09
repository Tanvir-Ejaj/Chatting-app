import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import "./style.css";
import { signIn } from "./../../validation/validation";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../Features/Slice/UserSlice";

const Login = () => {
  const [passwordShow, setPasswordShow] = useState("password");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const faceboookProvider = new FacebookAuthProvider();
  const gitHubProvider = new GithubAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlepass = () => {
    if (passwordShow === "password") {
      setPasswordShow("text");
    } else {
      setPasswordShow("password");
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signIn,
    onSubmit: () => {
      setLoading(true);
      signInWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(({ user }) => {
          if (auth.currentUser.emailVerified === true) {
            navigate("/");
            dispatch(LoginUser(user));
            localStorage.setItem("users", JSON.stringify(user));
            setLoading(false);
            toast.success("Successful!", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              theme: "light",
            });
          } else {
            setLoading(false);
            toast.warn("Please Verify Your Email!", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
            });
          }
        })
        .catch((error) => {
          if (error.code.includes("auth/user-not-found")) {
            toast.error("Please Check Email or Password", {
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

  const handleGoogleAuth = () => {
    signInWithPopup(auth, googleProvider).then(({ user }) => {
      dispatch(LoginUser(user));
      localStorage.setItem("users", JSON.stringify(user));
      toast.success("Successful!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light",
      });
      navigate("/");
    });
  };

  const handleFacebookAuth = () => {
    signInWithPopup(auth, faceboookProvider).then(({ user }) => {
      dispatch(LoginUser(user));
      localStorage.setItem("users", JSON.stringify(user));
      toast.success("Successful!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light",
      });
      navigate("/");
    });
  };

  const handleGitHubAuth = () => {
    signInWithPopup(auth, gitHubProvider).then(({ user }) => {
      dispatch(LoginUser(user));
      localStorage.setItem("users", JSON.stringify(user));
      toast.success("Successful!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light",
      });
      navigate("/");
    });
  };

  return (
    <div>
      <Container fixed>
        <ToastContainer />
        <Grid container spacing={2} className="login-main">
          <Grid item xs={6} className="login-left">
            <picture>
              <img
                src="./images/login.png"
                alt="registration-pic"
                className="regi-pic"
              />
            </picture>
          </Grid>
          <Grid item xs={6} className="login-right">
            <div className="avater">
              <picture>
                <img src="./images/avatar.png" alt="avater" />
              </picture>
            </div>
            <h3>Login To Your Account</h3>
            <div className="auth-wraper">
              <div className="auth-main" onClick={handleGoogleAuth}>
                <div className="auth-icon">
                  <FcGoogle />
                </div>
                <div className="auth-text">
                  <h3>Login With Google</h3>
                </div>
              </div>
              <div className="auth-main" onClick={handleFacebookAuth}>
                <div className="auth-icon">
                  <FaFacebookF />
                </div>
                <div className="auth-text">
                  <h3>Login With Facebook</h3>
                </div>
              </div>
              <div className="auth-main" onClick={handleGitHubAuth}>
                <div className="auth-icon">
                  <AiFillGithub />
                </div>
                <div className="auth-text">
                  <h3>Login With Microsoft</h3>
                </div>
              </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                className="input"
                label="Enter email"
                variant="outlined"
                name="email"
                onChange={formik.handleChange}
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
                  name="password"
                  onChange={formik.handleChange}
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
              <p className="forget">
                Forget Password ?{" "}
                <Link to="/forgetpassword">Forget Password</Link>{" "}
              </p>
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
                  Log In
                </Button>
              )}
            </form>
            <h6>
              Don't have an account ? <Link to="/registration">Sign Up</Link>
            </h6>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
