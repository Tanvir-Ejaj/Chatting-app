import React, { useEffect, useState } from "react";
import "./style.css";
import Button from "@mui/material/Button";
import { IoMdAdd } from "react-icons/io";
import { HiXMark } from "react-icons/hi2";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";

const UserList = () => {
  const [userlists, setUserlists] = useState([]);
  const db = getDatabase();
  const user = useSelector((users) => users.loginSlice.login);
  const [friendReq, setFriendReq] = useState([]);
  const [friendlist, setFriendlist] = useState([]);
  // const [cancelReq, setCancelReq] = useState([]);

  // Userlist Show

  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      const userArray = [];
      snapshot.forEach((userlists) => {
        if (user.uid !== userlists.key) {
          userArray.push({ ...userlists.val(), id: userlists.key });
        }
      });
      setUserlists(userArray);
    });
  }, []);

  // Friend Request Send

  const handleReqSend = (item) => {
    set(push(ref(db, "friendrequest")), {
      sendername: user.displayName,
      senderid: user.uid,
      receivername: item.username,
      receiverid: item.id,
    });
  };

  // Show Friend Request

  useEffect(() => {
    const starCountRef = ref(db, "friendrequest/");
    onValue(starCountRef, (snapshot) => {
      let reqArray = [];
      snapshot.forEach((item) => {
        reqArray.push(item.val().receiverid + item.val().senderid);
      });
      setFriendReq(reqArray);
    });
  }, []);

  // Delete Friend

  const handleDeleteReq = (data) => {
    remove(ref(db, "friendrequest/" + data.id));
    console.log(data);
  };

  // Friendlist Show

  useEffect(() => {
    const starCountRef = ref(db, "friends");
    onValue(starCountRef, (snapshot) => {
      let friendArray = [];
      snapshot.forEach((item) => {
        friendArray.push(item.val().receiverid + item.val().senderid);
      });
      setFriendlist(friendArray);
    });
  }, []);

  return (
    <>
      <div className="user-list-main">
        <div className="header">
          <h3>User List</h3>
        </div>
        <div className="user-list-body">
          {userlists.map((item, i) => (
            <div key={i} className="user-list-inner">
              <div className="user-list-pics">
                <picture>
                  <img src="./images/profile-pic.png" alt="friend-pic" />
                </picture>
              </div>
              <div className="user-list-text">
                <h3>{item.username}</h3>
              </div>
              <div className="user-list-btn">
                {friendlist.includes(item.id + user.uid) ||
                friendlist.includes(user.uid + item.id) ? (
                  <Button variant="contained" disabled>
                    Friends
                  </Button>
                ) : friendReq.includes(item.id + user.uid) ||
                  friendReq.includes(user.uid + item.id) ? (
                  <Button
                    variant="contained"
                    onClick={() => handleDeleteReq(item)}
                  >
                    <HiXMark />
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => handleReqSend(item)}
                  >
                    <IoMdAdd />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserList;
