import React, { useEffect, useState } from "react";
import "./style.css";
import Button from "@mui/material/Button";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";

const FriendRequest = () => {
  const db = getDatabase();
  const [friendReq, setFriendReq] = useState([]);
  const user = useSelector((users) => users.loginSlice.login);

  // Show Friend Request

  useEffect(() => {
    const starCountRef = ref(db, "friendrequest/");
    onValue(starCountRef, (snapshot) => {
      let reqArray = [];
      snapshot.forEach((item) => {
        if (item.val().receiverid === user.uid) {
          reqArray.push({ ...item.val(), id: item.key });
        }
      });
      setFriendReq(reqArray);
    });
  }, []);

  // Accept Request
  
  const handleAccept = (data)=>{
    set(push(ref(db, "friends")), {
      ...data
    }).then(()=>{
      remove(ref(db , "friendrequest/" + data.id))
    });
  }

  const handleReject = (data)=>{
    remove(ref(db , "friendrequest/" + data.id))
  }

  return (
    <>
      <div className="friend-request-main">
        <div className="header">
          <h3>Friend Request</h3>
        </div>
        <div className="friend-request-body">
          {friendReq.map((item, i) => (
            <div className="friend-request-inner" key={i}>
              <div className="friend-request-pics">
                <picture>
                  <img src="./images/avatar.png" alt="prfile-pic" />
                </picture>
              </div>
              <div className="friend-request-text">
                <h3>{item.sendername}</h3>
                <p>Hi Guys, Wassup!</p>
              </div>
              <div className="friend-request-btn">
                <Button onClick={()=>{handleAccept(item)}}>Accept</Button>
                <Button onClick={()=>{handleReject(item)}}>Reject</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FriendRequest;
