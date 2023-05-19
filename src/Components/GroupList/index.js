import React, { useEffect, useState } from "react";
import "./style.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "@mui/material/Alert";

const Groups = () => {
  const db = getDatabase();
  const user = useSelector((users) => users.loginSlice.login);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [groupname, setGroupName] = useState("");
  const [grouptag, setGroupTag] = useState("");
  const [grouplist, setGroupList] = useState([]);

  // For Creating Groups
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // Create Group

  const handleCreate = (item) => {
    set(push(ref(db, "groups")), {
      groupname: groupname,
      grouptag: grouptag,
      adminname: user.displayName,
      adminid: user.uid,
    }).then(() => {
      setOpen(false);
      toast.success("Successfull", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  };

  // For all created grouplist Show

  useEffect(() => {
    const starCountRef = ref(db, "groups/");
    onValue(starCountRef, (snapshot) => {
      let groupArray = [];
      snapshot.forEach((grouplist) => {
        if (grouplist.val().adminid !== user.uid) {
          groupArray.push({ ...grouplist.val(), id: grouplist.key });
        }
      });
      setGroupList(groupArray);
    });
  }, []);

  // Join Group

  const handleJoin = (item) => {
    set(push(ref(db, "grouprequest")), {
      groupid: item.id,
      groupname: item.groupname,
      grouptag: item.grouptag,
      admin: item.adminname,
      adminid: item.adminid,
      userid: user.uid,
      username: user.displayName,
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="groups-main">
        <div className="header">
          <h3>Groups Request</h3>
          <div className="grp_create_btn">
            <Button variant="outlined" onClick={handleOpen}>
              Create Group
            </Button>
          </div>
        </div>
        <div className="group-body">
          {grouplist.length === 0 ? (
            <Alert className="alert_1" severity="error">
              Not a single group was created.
            </Alert>
          ) : (
            grouplist.map((item, i) => (
              <div className="group-inner" key={i}>
                <div className="group-pics">
                  <picture>
                    <img src="./images/profile-pic.png" alt="group-pic" />
                  </picture>
                </div>
                <div className="group-text">
                  <h3>{item.groupname}</h3>
                  <p>{item.grouptag}</p>
                </div>
                <div className="group-btn">
                  <Button onClick={() => handleJoin(item)}>Join</Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create New Group
          </Typography>
          <TextField
            id="outlined-basic"
            label="Group Name"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={(e) => setGroupName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Group Tag"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={(e) => setGroupTag(e.target.value)}
          />
          <Button
            variant="contained"
            className="group_btn"
            onClick={handleCreate}
          >
            Create Group
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Groups;
