import { info } from "autoprefixer";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContentCenter from "../components/ContentCenter";
import ContentLeft from "../components/ContentLeft";
import ContentRight from "../components/ContentRight";
import HeaderClient from "../components/HeaderClient";
import { setSocket, setUser } from "../store/reducers/authReducer";
import jwt_decode from "jwt-decode";
import { useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import {
  handleFetchFriends,
  handleFetchNotis,
  handleFetchRequestFriend,
  setClientCall,
} from "../store/reducers/userReducer";
// import "../StringeeSDK-1.5.10";
import { ToastContainer, toast } from "react-toastify";

const LayoutClient = ({ children, socket, search = "" }) => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const { tokenCallVideo, requestFriend } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [videoCall, setVideoCall] = useState(false);
  useEffect(() => {
    socket.off("videoCall");
    socket.off("browserReportToUser");

    socket?.on("videoCall", (data) => {
      console.log("get video calll ne");
      setVideoCall(data);
      let myAudio = new Audio("../vintage-phone.mp3");
      myAudio.play();
    });
    socket?.on("browserReportToUser", (data) => {
      console.log("get video calll ne");
      let myAudio = new Audio("../notification-125767.mp3");
      myAudio.play();
      toast.success(`Admin: ${data.text}`, {
        position: "bottom-right",
        autoClose: 2000,
      });
      dispatch(handleFetchNotis());
    });

    socket?.off("notiAddFriend");

    socket?.on("notiAddFriend", (data) => {
      console.log("noti add friend");
      let myAudio = new Audio("../notification-125767.mp3");
      myAudio.play();
      toast.success(`${data.text}`, {
        position: "top-right",
        autoClose: 2000,
      });
      dispatch(handleFetchNotis());
      dispatch(handleFetchFriends());
      dispatch(handleFetchRequestFriend());
    });
    socket?.off("notiAcceptAddFriend");

    socket?.on("notiAcceptAddFriend", (data) => {
      console.log("noti add friend");
      let myAudio = new Audio("../notification-125767.mp3");
      myAudio.play();
      toast.success(`${data.text}`, {
        position: "top-right",
        autoClose: 2000,
      });
      dispatch(handleFetchNotis());
      dispatch(handleFetchFriends());
      dispatch(handleFetchRequestFriend());
    });
  }, []);
  const answerCall = () => {
    console.log("ulatr me");
    window.open(
      "https://minh352623.github.io/service-chiase-ctu/?callerId=" +
        user?.id +
        "&calleeId=" +
        videoCall?.senderId +
        "&token=" +
        tokenCallVideo +
        "&anwser=" +
        1,
      "_blank"
    );
    setVideoCall(false);
  };
  useEffect(() => {
    dispatch(handleFetchFriends());
    dispatch(handleFetchRequestFriend());
  }, [user]);
  return (
    <>
      {user && (
        <>
          {videoCall && (
            <div className="fixed p-3 z-[100] left-1/2 top-1/2 flex items-center flex-col justify-center  -translate-x-1/2 -translate-y-1/2 bg-blue-400 xl:w-[30vw] w-[80vw] h-[80vh]  text-white shadow-xl rounded-lg">
              <p>
                <img
                  src={
                    videoCall.avatar ? videoCall.avatar : "./undraw_profile.svg"
                  }
                  className="w-[100px] rounded-full"
                  alt=""
                />
              </p>
              <p className="font-bold">{videoCall.text}</p>
              <div className="flex justify-between w-2/3 my-5">
                <p
                  className="font-bold p-3 cursor-pointer bg-red-500 rounded-full"
                  onClick={() => setVideoCall(false)}
                >
                  <img
                    src="./phone-call.png"
                    className="w-[50px] block object-cover"
                    alt=""
                  />
                </p>
                <p
                  className=" font-bold p-3 cursor-pointer bg-green-500 rounded-full"
                  onClick={answerCall}
                >
                  <img
                    className="bucket w-[50px] block object-cover"
                    src="./video-camera.png"
                    alt=""
                  />
                </p>
              </div>
            </div>
          )}
          <HeaderClient
            search={search}
            requestFriend={requestFriend}
            socket={socket}
            user={user}
          ></HeaderClient>
          {children}
        </>
      )}
    </>
  );
};

export default LayoutClient;
