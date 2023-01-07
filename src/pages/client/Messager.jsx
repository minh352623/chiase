import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ItemConversationCurrent from "../../components/ItemConversationCurrent";
import Message from "../../components/Message";
import LayoutClient from "../../layouts/LayoutClient";
import Picker from "emoji-picker-react";
const Messager = ({ socket }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const [curentChat, setCurrentChat] = useState();
  const [conversation, setConversation] = useState();
  const [messages, setMesssages] = useState();
  const [friend, setFriend] = useState();
  const [message, setMessage] = useState();
  const srcollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState();
  const { tokenCallVideo } = useSelector((state) => state.user);

  // const socket = useRef();
  //socket io
  // useEffect(() => {
  //   setSocket(io("ws://localhost:8900"));
  // }, []);
  useEffect(() => {
    socket.off("alertMessage");

    // socket.current = io("ws://localhost:8900");
    socket?.on("getMessage", (data) => {
      console.log("get ne");
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    arrivalMessage &&
      [curentChat?.user_one, curentChat?.user_second]?.includes(
        arrivalMessage.sender
      ) &&
      setMesssages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, curentChat]);

  useEffect(() => {
    // socket?.current.emit("addUser", user?.id);
    socket?.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);
  //end socket io
  const FetchConversation = async () => {
    try {
      const response = await axios({
        url: "/auth/conversation",
      });
      console.log(response);
      if (response.status == 200) {
        setConversation(response.data);
      }
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    FetchConversation();
  }, []);
  console.log(curentChat);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "/auth/message/" + curentChat?.id,
        });
        console.log(response);
        if (response.status === 200) {
          setMesssages(response.data);
        }
      } catch (e) {
        console.log(e);
        if (e.response.status == 401) {
          navigate("/login");
        }
      }
    };
    getMessages();
    if (curentChat) {
      const friend_id = [curentChat.user_one, curentChat.user_second].find(
        (u) => u !== user?.id
      );

      const getUser = async () => {
        try {
          const response = await axios({
            url: "auth/admin/user/" + friend_id,
          });
          console.log(response);
          if (response.status === 200) {
            setFriend(response.data);
          }
        } catch (e) {
          console.log(e);
          if (e.response.status == 401) {
            navigate("/login");
          }
        }
      };
      getUser();
    }
  }, [curentChat]);

  const createMessage = async (e) => {
    e.preventDefault();
    if (!message) return alert("vui lòng nhập kí tự");
    const message_data = {
      sender: user?.id,
      text: message,
      id_conversation: curentChat.id,
    };

    const receiverId = [curentChat.user_one, curentChat.user_second].find(
      (u) => u !== user?.id
    );
    socket?.emit("sendMessage", {
      senderId: user?.id,
      nameSender: user?.firstName + " " + user?.lastName,
      receiverId: receiverId,
      text: message,
    });

    try {
      const response = await axios({
        method: "POST",
        url: "/auth/message",
        data: message_data,
      });
      if (response.status === 200) {
        console.log(response);

        setMesssages([...messages, response.data]);
        setMessage("");
      }
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
    // console.log(messgae);
  };

  useEffect(() => {
    srcollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [showEmoji, setShowEmoji] = useState(false);
  const input_value = useRef();

  const onEmojiClick = (event, emojiObject) => {
    console.log(event);
    input_value.current.value = message + " " + event.emoji;
    setMessage((pre) => pre + " " + event.emoji);
    setShowEmoji(false);
  };

  //video call
  const [joinded, setJoined] = useState(false);
  const callVideoChat = async () => {
    try {
      // setJoined(true);
      socket?.emit("callVideo", {
        avatar: user?.avatar,
        senderId: user?.id,
        nameSender: user?.firstName + " " + user?.lastName,
        receiverId: friend?.id,
        text: "Bạn có cuộc gọi từ " + user?.firstName + " " + user?.lastName,
      });
      window.open(
        "https://minh352623.github.io/service-chiase-ctu/?callerId=" +
          user?.id +
          "&calleeId=" +
          friend?.id +
          "&token=" +
          tokenCallVideo +
          "&caller=" +
          1,
        "_blank"
      );
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  //end video call

  return (
    <LayoutClient socket={socket}>
      <div className="grid grid-cols-12 h-[91.5vh] ">
        <div className="col-span-3 h-[91.5vh] ">
          <div className="p-3 h-full">
            <div className="xl:h-1/4 h-[1/8]">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-black">Chat</span>
                <div className="hidden xl:flex gap-2 items-center">
                  <span className="p-2 rounded-full bg-slate-300 transition-all hover:bg-gray-400 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 text-black h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  </span>
                  <span
                    onClick={() => {
                      window.open(
                        "https://minh352623.github.io/service-chiase-ctu/group_call.html",

                        "_blank"
                      );
                    }}
                    className="p-2 rounded-full bg-slate-300 transition-all hover:bg-gray-400 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 text-black h-6"
                    >
                      <path
                        strokeLinecap="round"
                        d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </span>
                  <span className="p-2 rounded-full bg-slate-300 transition-all hover:bg-gray-400 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 text-black h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="hidden xl:block my-3 relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm trên messager"
                  className="pl-5 pr-3 py-2 w-full rounded-full outline-none bg-gray-200"
                />
                <span className="absolute top-1/2 -translate-y-1/2 left-[12px] ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </span>
              </div>
              <div className="hidden xl:block  flex gap-3">
                <span className="py-2 cursor-pointer px-3 font-bold text-blue-500 bg-blue-100 opacity-70 transition-all hover:opacity-100 rounded-full">
                  Hộp thư
                </span>
              </div>
            </div>
            <div className="xl:h-3/4 h-[7/8] overflow-x-hidden overflow-y-auto">
              {conversation &&
                conversation.map((cv) => (
                  <ItemConversationCurrent
                    key={cv.id}
                    setCurrentChat={setCurrentChat}
                    conversation={cv}
                    arrivalMessage={arrivalMessage}
                    currentUser={user}
                    curentChat={curentChat}
                  ></ItemConversationCurrent>
                ))}
            </div>
          </div>
        </div>
        <div className="col-span-9 h-[91.5vh] ">
          {curentChat ? (
            <div className="h-full w-full border-l-2 border-2 border-r-2 overflow-hidden">
              <div className="h-[10%] shadow-sm">
                <div className="flex px-3 py-2 h-full justify-between items-center">
                  <div className="flex gap-3 items-center">
                    {friend && (
                      <>
                        <span className="h-full block">
                          <img
                            src={
                              friend?.avatar
                                ? friend.avatar
                                : "../../undraw_profile.svg"
                            }
                            className="h-full rounded-full w-[50px]"
                            alt=""
                          />
                        </span>
                        <p className="m-0">
                          <span className="font-bold text-black">
                            {friend?.firstName + " " + friend.lastName}
                          </span>
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <span
                      onClick={callVideoChat}
                      className="p-2 hover:bg-gray-200 transition-all rounded-full cursor-pointer"
                    >
                      <img
                        src="../../phone-call.png"
                        className="w-[25px]"
                        alt=""
                      />
                    </span>
                    <span
                      onClick={callVideoChat}
                      className="p-2 hover:bg-gray-200 transition-all rounded-full cursor-pointer"
                    >
                      <img
                        src="../../video-camera.png"
                        className="w-[25px]"
                        alt=""
                      />
                    </span>
                    <span className="p-2 hover:bg-gray-200 transition-all rounded-full cursor-pointer">
                      <img src="../../about.png" className="w-[25px]" alt="" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-[80%] max-h-80%] overflow-y-auto px-3 ">
                {messages &&
                  friend &&
                  user &&
                  messages.length > 0 &&
                  messages.map((item) => (
                    <div key={item.id} ref={srcollRef}>
                      <Message
                        item={item}
                        own={user}
                        friend={friend}
                        current={item.sender == user?.id ? 1 : 0}
                      ></Message>
                    </div>
                  ))}
                {messages && messages.length <= 0 && (
                  <div className="h-full text-xl w-full bg-gray-200  mt-1 flex rounded-xl items-center justify-center">
                    Hãy bắt đầu cuộc trò chuyện ngay bây giờ!
                  </div>
                )}
              </div>

              <div className="h-[10%] p-3">
                <form onSubmit={createMessage} action="">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      ref={input_value}
                      onChange={(e) => setMessage(e.target.value)}
                      name="message"
                      className="w-full resize-none py-2 px-4 text-black outline-none bg-gray-200 rounded-full"
                      placeholder="Aa"
                      value={message}
                    />
                    <div className="p-1 relative hover:bg-gray-300 rounded-full w-fit cursor-pointer">
                      {showEmoji && (
                        <div className="fixed  z-[100] top-[60%] right-[5%] -translate-y-1/2">
                          <Picker
                            pickerStyle={{ width: "100%" }}
                            onEmojiClick={onEmojiClick}
                          ></Picker>
                        </div>
                      )}
                      <img
                        onClick={() => setShowEmoji((showEmoji) => !showEmoji)}
                        src="./smile.png"
                        className="w-[40px]"
                        alt=""
                      />
                    </div>
                    <button
                      type="submit"
                      className="p-2 hover:bg-gray-300 rounded-full transition-all"
                    >
                      <img src="../../send.png" className="w-[30px]" alt="" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <>
              <div className="h-full text-xl w-full bg-gray-200 flex items-center justify-center">
                Chưa có cuộc trò chuyện nào được chọn!
              </div>
            </>
          )}
        </div>
      </div>
    </LayoutClient>
  );
};

export default Messager;
