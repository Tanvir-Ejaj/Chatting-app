import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import firebaseConfig from "./dbconnection/firebaseConfig";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { Provider } from "react-redux";
import store from './Features/Store/store';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
