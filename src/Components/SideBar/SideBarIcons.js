import React from "react";
import {
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineBell,
  AiFillSetting,
} from "react-icons/ai";

const SideBarIcons = () => {
  return (
    <div className="icons-main">
      <div className="icons-inner">
        <AiOutlineHome />
      </div>
      <div className="icons-inner">
        <AiOutlineMessage />
      </div>
      <div className="icons-inner">
        <AiOutlineBell />
      </div>
      <div className="icons-inner">
        <AiFillSetting />
      </div>
    </div>
  );
};

export default SideBarIcons;
