import React from "react";
import "./style.css";
import Button from "@mui/material/Button";

const Friends = () => {
  return (
    <>
      <div className="friends-main">
        <div className="header">
          <h3>Friends</h3>
        </div>
        <div className="friends-body">
          <div className="friends-inner">
            <div className="friends-pics">
              <picture>
                <img src="./images/profile-pic.png" alt="friend-pic" />
              </picture>
            </div>
            <div className="friends-text">
              <h3>Raghav</h3>
            </div>
            <div className="friends-btn">
              <Button variant="contained">Block</Button>
            </div>
          </div>
          <div className="friends-inner">
            <div className="friends-pics">
              <picture>
                <img src="./images/profile-pic.png" alt="friend-pic" />
              </picture>
            </div>
            <div className="friends-text">
              <h3>Raghav</h3>
            </div>
            <div className="friends-btn">
              <Button variant="contained">Block</Button>
            </div>
          </div>
          <div className="friends-inner">
            <div className="friends-pics">
              <picture>
                <img src="./images/profile-pic.png" alt="friend-pic" />
              </picture>
            </div>
            <div className="friends-text">
              <h3>Raghav</h3>
            </div>
            <div className="friends-btn">
              <Button variant="contained">Block</Button>
            </div>
          </div>
          <div className="friends-inner">
            <div className="friends-pics">
              <picture>
                <img src="./images/profile-pic.png" alt="friend-pic" />
              </picture>
            </div>
            <div className="friends-text">
              <h3>Raghav</h3>
            </div>
            <div className="friends-btn">
              <Button variant="contained">Block</Button>
            </div>
          </div>
          <div className="friends-inner">
            <div className="friends-pics">
              <picture>
                <img src="./images/profile-pic.png" alt="friend-pic" />
              </picture>
            </div>
            <div className="friends-text">
              <h3>Raghav</h3>
            </div>
            <div className="friends-btn">
              <Button variant="contained">Block</Button>
            </div>
          </div>
          <div className="friends-inner">
            <div className="friends-pics">
              <picture>
                <img src="./images/profile-pic.png" alt="friend-pic" />
              </picture>
            </div>
            <div className="friends-text">
              <h3>Raghav</h3>
            </div>
            <div className="friends-btn">
              <Button variant="contained">Block</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;
