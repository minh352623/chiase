import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import "../assets/vendor/jquery/jquery.min.js";
import "../assets/vendor/bootstrap/js/bootstrap.bundle.min.js";

import "../assets/vendor/jquery-easing/jquery.easing.min.js";
import "../assets/js/sb-admin-2.min.js";
import SidebarComponent from "../components/SidebarComponent.jsx";
import NavbarComponent from "../components/NavbarComponent.jsx";
import FooterComponent from "../components/FooterComponent.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/reducers/authReducer.js";
import { ToastContainer, toast } from "react-toastify";
import { handleFetchNotiReport } from "../store/reducers/userReducer.js";

const LayoutAdmin = ({ children, socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const FetchUserReload = () => {
    let accessToken = localStorage.getItem("access_token") || {};
    var decodedPayload = jwt_decode(accessToken)?.dataValues || null;
    console.log(decodedPayload);
    dispatch(setUser(decodedPayload));
  };
  useEffect(() => {
    console.log(socket);

    socket?.off("reportToAdminCurrent");

    // socket.current = io("ws://localhost:8900");
    socket?.on("reportToAdminCurrent", (data) => {
      console.log("get ne");
      if (+user?.group_id == 1) {
        let myAudio = new Audio("../notification-125767.mp3");
        myAudio.play();
        dispatch(handleFetchNotiReport());

        toast.info(`Bạn có 1 báo cáo mới từ người dùng`, {
          position: "top-right",
          autoClose: 2000,
        });
      }
    });
  }, [socket]);
  useEffect(() => {
    FetchUserReload();
    dispatch(handleFetchNotiReport());
  }, []);

  return (
    <div>
      <div id="wrapper">
        <SidebarComponent></SidebarComponent>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <NavbarComponent></NavbarComponent>
            <div className="container-fluid">{children}</div>
          </div>

          <FooterComponent></FooterComponent>
        </div>
      </div>

      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>

      <div
        className="modal fade"
        id="logoutModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Ready to Leave?
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              Select "Logout" below if you are ready to end your current
              session.
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                type="button"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <p
                className="btn btn-primary"
                onClick={(e) => {
                  localStorage.removeItem("access_token");
                  window.location.href = "/admin/login";
                }}
              >
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
