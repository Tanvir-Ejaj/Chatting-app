import * as Yup from "yup";

export const signUp = Yup.object({
  fullname: Yup.string().min(3).required("Please Enter Your Name"),
  email: Yup.string().email().required("Please Enter Your Email"),
  password: Yup.string().min(8).required("Please Enter password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password Must Macth")
    .min(8)
    .required("Please Enter confirm password"),
});

export const signIn = Yup.object({
  email :Yup.string().email().required("Please Enter Your Email"),
  password :Yup.string().min(8).required("Please Enter Your Password")
})
