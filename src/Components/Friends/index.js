import React, { useEffect, useState } from "react";
import "./style.css";
import Button from "@mui/material/Button";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";

const Friends = () => {
  const db = getDatabase();
  const [friendlist, setFriendlist] = useState([]);
  const user = useSelector((users) => users.loginSlice.login);

  // Show in friend list
  useEffect(() => {
    const starCountRef = ref(db, "friends");
    onValue(starCountRef, (snapshot) => {
      let friendArray = [];
      snapshot.forEach((item) => {
        friendArray.push(item.val());
      });
      setFriendlist(friendArray);
    });
  }, []);
  return (
    <>
      <div className="friends-main">
        <div className="header">
          <h3>Friends</h3>
        </div>
        <div className="friends-body">
          {friendlist.map((item, i) => (
            <div className="friends-inner" key={i}>
              <div className="friends-pics">
                <picture>
                  <img src="./images/profile-pic.png" alt="friend-pic" />
                </picture>
              </div>
              <div className="friends-text">
                <h3>
                  {user.uid === item.senderid
                    ? item.receivername
                    : item.sendername}
                </h3>
              </div>
              <div className="friends-btn">
                <Button variant="contained">Block</Button>
                <Button variant="contained">Unfriend</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Friends;
