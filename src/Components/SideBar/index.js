import React from "react";
import SideBarIcons from "./SideBarIcons";
import "./style.css";
import { FiLogIn } from "react-icons/fi";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../Features/Slice/UserSlice";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import PopUp from "../Modal";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const users = useSelector((user) => user.loginSlice.login);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("users");
        dispatch(LoginUser(null));
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.mesage);
      });
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="sidebar-main">
        <div className="sidebar-wrapper">
          <div className="profile">
            <div className="profile-picture" onClick={handleOpen}>
              <picture>
                {/* <img src="./images/profile-pic.png" alt="" /> */}
                {/* <img src={users.photoURL} alt="profile=pic" /> */}
                {users.photoURL ? (
                  <img src={users.photoURL} alt="profile=pic" />
                ) : (
                  <img src="./images/avatar.png" alt="default-pic" />
                )}
              </picture>
              <div className="profile-pic-overlay">
                <AiOutlineCloudUpload />
              </div>
            </div>
            <div className="username">
              <h3>{users.displayName}</h3>
            </div>
          </div>
          <div className="others-page">
            <SideBarIcons />
          </div>
          <div className="log-out" onClick={handleLogOut}>
            <FiLogIn />
          </div>
        </div>
      </div>
      <PopUp open={open} setOpen={setOpen} />
    </>
  );
};

export default SideBar;
