import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./../Slice/UserSlice";

const store = configureStore({
  reducer: {
    loginSlice: authSlice,
  },
});

export default store;
