import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function NotLoggedIn() {
  const user = useSelector((state) => state.loginSlice.login);
  return user ? <Navigate to="/" /> : <Outlet />;
}
