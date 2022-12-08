import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./assets/css/sb-admin-2.min.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import "./config/common.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
