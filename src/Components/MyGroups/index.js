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
import Alert from "@mui/material/Alert";
import SearchBox from "../SearchBox";

const MyGroups = () => {
  const db = getDatabase();
  const user = useSelector((users) => users.loginSlice.login);
  const [grouplist, setGroupList] = useState([]);
  const [show, setShow] = useState(false);
  const [groupMember, setGroupMember] = useState([]);
  const [member, setMember] = useState(false);
  const [groupreqlist, setGroupReqList] = useState([]);

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

  // Request Show

  const handleReqShow = (gitem) => {
    const starCountRef = ref(db, "grouprequest");
    onValue(starCountRef, (snapshot) => {
      let groupreqarray = [];
      snapshot.forEach((item) => {
        if (
          item.val().adminid === user.uid &&
          item.val().groupid === gitem.id
        ) {
          groupreqarray.push({ ...item.val(), id: item.key });
        }
      });
      setGroupReqList(groupreqarray);
    });
    setShow(true);
  };

  // Accept Group Request

  const handleAccept = (item) => {
    set(push(ref(db, "groupmember")), {
      adminid: item.adminid,
      groupid: item.groupid,
      userid: item.userid,
      admin: item.admin,
      username: item.username,
      groupname: item.groupname,
    }).then(() => {
      remove(ref(db, "grouprequest/" + item.id));
    });
  };

  const handleDelete = (item) => remove(ref(db, "grouprequest/" + item.id));

  // Group Member Show

  const handleInfo = (groupmember) => {
    setMember(true);
    const starCountRef = ref(db, "groupmember/");
    onValue(starCountRef, (snapshot) => {
      let memberArray = [];
      snapshot.forEach((item) => {
        if (
          user.uid == groupmember.adminid &&
          groupmember.id == item.val().groupid
        ) {
          memberArray.push({ ...item.val(), id: item.key });
        }
      });
      setGroupMember(memberArray);
    });
  };

  // Remove User From The group

  const handleRemove = (item) => {
    remove(ref(db, "groupmember/" + item.id));
  };

  const handleSearch = (e)=>{
    
  }

  return (
    <>
      <div className="my-groups-main">
        <div className="header">
          <h3>My Groups</h3>
        </div>
        <div className="search_box">
          <SearchBox onChange={handleSearch}/>
        </div>
        <div className="my-groups-body">
          {show && (
            <Button variant="outlined" onClick={() => setShow(false)}>
              Back
            </Button>
          )}
          {member && (
            <Button variant="outlined" onClick={() => setMember(false)}>
              Back
            </Button>
          )}
          {grouplist.length === 0 ? (
            <Alert className="alert_1" severity="error">
              You didn't create any group.
            </Alert>
          ) : show ? (
            groupreqlist.length === 0 ? (
              <Alert className="alert_1" severity="error">
                You Don't Have Any Requsest
              </Alert>
            ) : (
              groupreqlist.map((item, i) => (
                <div className="my-groups-inner" key={i}>
                  <div className="my-groups-pics">
                    <picture>
                      <img src="./images/profile-pic.png" alt="friend-pic" />
                    </picture>
                  </div>
                  <div className="my-groups-text">
                    <h3>{item.username}</h3>
                  </div>
                  <div className="my-groups-btn">
                    <Button
                      variant="contained"
                      onClick={() => handleAccept(item)}
                    >
                      Accept
                    </Button>
                    <Button
                      className="reject-btn"
                      variant="contained"
                      onClick={() => handleDelete(item)}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))
            )
          ) : member ? (
            groupMember.map((item, i) => (
              <div className="my-groups-inner" key={i}>
                <div className="my-groups-pics">
                  <picture>
                    <img src="./images/profile-pic.png" alt="friend-pic" />
                  </picture>
                </div>
                <div className="my-groups-text">
                  <h3>{item.username}</h3>
                </div>
                <div className="my-groups-btn">
                  <Button
                    variant="contained"
                    onClick={() => handleRemove(item)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))
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
                  <Button variant="contained" onClick={() => handleInfo(item)}>
                    Info
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleReqShow(item)}
                  >
                    Requests
                  </Button>
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
