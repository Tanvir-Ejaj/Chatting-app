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
import Alert from '@mui/material/Alert';

const MyGroups = () => {
  const db = getDatabase();
  const user = useSelector((users) => users.loginSlice.login);
  const [grouplist, setGroupList] = useState([]);

  // Show Created Group List

  useEffect(() => {
    const starCountRef = ref(db, "groups/");
    onValue(starCountRef, (snapshot) => {
      let groupArray = [];
      snapshot.forEach((grouplist) => {
        if (grouplist.val().adminid === user.uid) {
          groupArray.push({ ...grouplist.val(), id: grouplist.key });
        }
      });
      setGroupList(groupArray);
    });
  }, []);
  return (
    <>
      <div className="my-groups-main">
        <div className="header">
          <h3>My Groups</h3>
        </div>
        <div className="my-groups-body">
          {grouplist.length === 0 ? (
            <Alert className="alert_1" severity="error">
              You didn't create any group.
            </Alert>
          ) : (
            grouplist.map((item, i) => (
              <div className="my-groups-inner" key={i}>
                <div className="my-groups-pics">
                  <picture>
                    <img src="./images/profile-pic.png" alt="friend-pic" />
                  </picture>
                </div>
                <div className="my-groups-text">
                  <h3>
                    <span className="groups_title">Group Name :</span>{" "}
                    {item.groupname}
                  </h3>
                  <h4>
                    <span className="groups_title">Group Tag :</span>{" "}
                    {item.grouptag}
                  </h4>
                </div>
                <div className="my-groups-btn">
                  <Button variant="contained">Info</Button>
                  <Button variant="contained">Requests</Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MyGroups;
