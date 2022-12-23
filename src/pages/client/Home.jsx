import React, { useState } from "react";
import { useSelector } from "react-redux";
import ContentCenter from "../../components/ContentCenter";
import ContentLeft from "../../components/ContentLeft";
import ContentRight from "../../components/ContentRight";
import LayoutClient from "../../layouts/LayoutClient";
import { io } from "socket.io-client";
import { useRef } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const Home = ({ socket }) => {
  // const socket = useRef();

  const { user } = useSelector((state) => state.auth);
  const [userOnline, setUserOnline] = useState();
  useEffect(() => {
    socket.off("alertMessage");
    // socket.current = io("ws://localhost:8900");
    socket?.on("getUsers", (users) => {
      console.log(users);

      setUserOnline(users);
    });
    socket?.on("alertMessage", (data) => {
      console.log(data);
      let myAudio = new Audio("../friend-request-14878.mp3");
      myAudio.play();
      toast.success(`${data.nameSender}: ${data.text}`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    });
  }, []);
  // useEffect(() => {
  //   socket?.current.emit("addUser", user?.id);
  // }, [user]);
  return (
    <LayoutClient socket={socket}>
      <div className="grid grid-cols-12 gap-5 p-3 bg-gray-200 h-[91.5vh]">
        <div className="xl:col-span-3 xl:block hidden">
          <ContentLeft user={user}></ContentLeft>
        </div>
        <div className="content_center xl:col-span-6 col-span-12 overflow-y-auto">
          <div className="xl:px-5 px-2">
            <ContentCenter socket={socket} user={user}></ContentCenter>
          </div>
        </div>
        <div className="xl:col-span-3 xl:block hidden">
          {userOnline && (
            <ContentRight userOnlineCurrent={userOnline}></ContentRight>
          )}
        </div>
      </div>
    </LayoutClient>
  );
};

export default Home;
