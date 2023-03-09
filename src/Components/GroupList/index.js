import React from "react";
import "./style.css";
import Button from "@mui/material/Button";

const Groups = () => {
  return (
    <>
      <div className="groups-main">
        <div className="header">
          <h3>Groups Request</h3>
        </div>
        <div className="group-body">
          <div className="group-inner">
            <div className="group-pics">
              <picture>
                <img src="./images/profile-pic.png" alt="group-pic" />
              </picture>
            </div>
            <div className="group-text">
              <h3>Friends Reunion</h3>
              <p>Hi Guys, Wassup!</p>
            </div>
            <div className="group-btn">
              <Button>Join</Button>
            </div>
          </div>
          <div className="group-inner">
            <div className="group-pics">
              <picture>
                <img src="./images/profile-pic.png" alt="group-pic" />
              </picture>
            </div>
            <div className="group-text">
              <h3>Friends Reunion</h3>
              <p>Hi Guys, Wassup!</p>
            </div>
            <div className="group-btn">
              <Button>Join</Button>
            </div>
          </div>
          <div className="group-inner">
            <div className="group-pics">
              <picture>
                <img src="./images/profile-pic.png" alt="group-pic" />
              </picture>
            </div>
            <div className="group-text">
              <h3>Friends Reunion</h3>
              <p>Hi Guys, Wassup!</p>
            </div>
            <div className="group-btn">
              <Button>Join</Button>
            </div>
          </div>
          <div className="group-inner">
            <div className="group-pics">
              <picture>
                <img src="./images/profile-pic.png" alt="group-pic" />
              </picture>
            </div>
            <div className="group-text">
              <h3>Friends Reunion</h3>
              <p>Hi Guys, Wassup!</p>
            </div>
            <div className="group-btn">
              <Button>Join</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Groups;
