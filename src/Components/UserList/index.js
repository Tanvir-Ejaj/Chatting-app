import React, { useEffect, useState } from "react";
import "./style.css";
import Button from "@mui/material/Button";
import { IoMdAdd } from "react-icons/io";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";

const UserList = () => {
  const [userlists, setUserlists] = useState([]);
  const db = getDatabase();
  const user = useSelector((users) => users.loginSlice.login);


  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      const userArray = [];
      snapshot.forEach((userlists) => {
        userArray.push({ ...userlists.val(), id: userlists.key });
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
              <div
                className="user-list-btn"
                onClick={() => handleReqSend(item)}
              >
                <Button variant="contained">
                  <IoMdAdd />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserList;
