import React from "react";
import {
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineBell,
  AiFillSetting,
} from "react-icons/ai";
import { NavLink } from "react-router-dom";

const SideBarIcons = () => {
  return (
    <div className="icons-main">
      <NavLink className="icons-inner" to="/">
        <AiOutlineHome />
      </NavLink>
      <NavLink className="icons-inner" to="/message">
        <AiOutlineMessage />
      </NavLink>
      <div className="icons-inner" to="/">
        <AiOutlineBell />
      </div>
      <div className="icons-inner" to="/">
        <AiFillSetting />
      </div>
    </div>
  );
};

export default SideBarIcons;
