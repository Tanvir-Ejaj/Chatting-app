import React from "react";
import "./style.css";
import Button  from '@mui/material/Button';

const FriendRequest = () => {
  return (
    <>
      <div className="friend-request-main">
        <div className="header">
          <h3>Friend Request</h3>
        </div>
        <div className="friend-request-body">
          <div className="friend-request-inner">
            <div className="friend-request-pics">
              <picture>
                <img src="./images/avatar.png" alt="prfile-pic" />
              </picture>
            </div>
            <div className="friend-request-text">
              <h3>Friends Reunion</h3>
              <p>Hi Guys, Wassup!</p>
            </div>
            <div className="friend-request-btn">
              <Button>Accept</Button>
              <Button>Reject</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendRequest;
