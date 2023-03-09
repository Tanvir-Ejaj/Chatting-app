import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";

export default function LoggedIn() {
  const user = useSelector((state) => state.loginSlice.login);
  return user ? <Outlet /> : <Login />;
}
