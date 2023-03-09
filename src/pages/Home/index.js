import React from "react";
import "./style.css";
import Grid from "@mui/material/Grid";
import SearchBox from "../../Components/SearchBox";
import Groups from './../../Components/GroupList/index';
import FriendRequest from "../../Components/FriendRequest";
import Friends from "../../Components/Friends";
import MyGroups from "../../Components/MyGroups";
import UserList from './../../Components/UserList/index';
import BlockedUser from "../../Components/BlockedUser";

const Home = () => {
  return (
    <>
      <Grid container className="home-main">
        <Grid item xs={4} className="home-inner">
          <div className="search-box">
            <SearchBox />
          </div>
          <div className="groups">
            <Groups />
          </div>
          <div className="request">
            <FriendRequest />
          </div>
        </Grid>
        <Grid item xs={3} className="home-inner">
          <div className="friends">
            <Friends />
          </div>
          <div className="groups">
            <MyGroups />
          </div>
        </Grid>
        <Grid item xs={3} className="home-inner">
          <div className="Userlist-main">
            <UserList />
          </div>
          <div className="BlockList-main">
            <BlockedUser />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
