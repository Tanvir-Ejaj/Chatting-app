import React from "react";
import "./style.css";
import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/SideBar";

const RootLayout = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={1}>
          <SideBar />
        </Grid>
        <Grid item xs={11}>
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
};

export default RootLayout;
