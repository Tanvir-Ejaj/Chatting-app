import React, { useEffect, useState } from "react";
import "./style.css";
import Button from "@mui/material/Button";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
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
        friendArray.push({ ...item.val(), id: item.key });
      });
      setFriendlist(friendArray);
    });
  }, []);

  // Block Friend

  const handleBlock = (item) => {
    if (user.uid === item.senderid) {
      set(push(ref(db, "block")), {
        block: item.receivername,
        blockedid: item.receiverid,
        blockedby: item.sendername,
        blockedbyid: item.senderid,
      }).then(() => {
        remove(ref(db, "friends/" + item.id));
      });
    } else {
      set(push(ref(db, "block")), {
        block: item.sendername,
        blockedid: item.senderid,
        blockedby: item.receivername,
        blockedbyid: item.receiverid,
      }).then(() => {
        remove(ref(db, "friends/" + item.id));
      });
    }
  };

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
                <Button variant="contained" onClick={() => handleBlock(item)}>
                  Block
                </Button>
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
