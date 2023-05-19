import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from "./pages/registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import LoggedIn from "./PrivateRouter/LoggedInUser";
import NotLoggedIn from "./PrivateRouter/NotLoggedIn";
import ForgetPass from "./pages/ForgetPassword/index";
import RootLayout from "./Layout";
import Message from "./pages/Message";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<LoggedIn />}>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/message" element={<Message />}></Route>
          </Route>
        </Route>
        <Route element={<NotLoggedIn />}>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgetpassword" element={<ForgetPass />}></Route>
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
