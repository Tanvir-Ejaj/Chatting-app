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

const BlockedUser = () => {
  const db = getDatabase();
  const user = useSelector((users) => users.loginSlice.login);
  const [blockUser, setBlockUser] = useState([]);

  // Block list show

  useEffect(() => {
    const starCountRef = ref(db, "block");
    onValue(starCountRef, (snapshot) => {
      let blockArray = [];
      snapshot.forEach((item) => {
        if (item.val().blockedbyid === user.uid) {
          blockArray.push({
            id: item.key,
            block: item.val().block,
            blockedid: item.val().blockedid,
          });
        } else {
          blockArray.push({
            id: item.key,
            blockedby: item.val().blockedby,
            blockedbyid: item.val().blockedbyid,
          });
        }
      });
      setBlockUser(blockArray);
    });
  }, []);

  // Unblock Friend

  const handleUnblock = (item) => {
    set(push(ref(db, "friends")), {
      sendername: item.block,
      senderid: item.blockedid,
      receiverid: user.uid,
      receivername: user.displayName,
    }).then(() => {
      remove(ref(db, "block/" + item.id));
    });
  };

  return (
    <div>
      <div className="block-main">
        <div className="header">
          <h3>Blocked Users</h3>
        </div>
        <div className="block-body">
          {blockUser.map((item, i) => (
            <div className="block-inner" key={i}>
              <div className="block-pics">
                <picture>
                  <img src="./images/profile-pic.png" alt="friend-pic" />
                </picture>
              </div>
              <div className="block-text">
                <h3>{item.block}</h3>
                <h3>{item.blockedby}</h3>
              </div>
              <div className="block-btn">
                {!item.blockedbyid && (
                  <Button
                    variant="contained"
                    onClick={() => handleUnblock(item)}
                  >
                    Unblock
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockedUser;
