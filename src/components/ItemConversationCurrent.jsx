import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ItemConversationCurrent = ({
  conversation,
  currentUser,
  setCurrentChat,
  arrivalMessage,
  curentChat,
}) => {
  const [friend, setFriend] = useState();
  const navigate = useNavigate();
  const [hightLight, setHightLight] = useState();
  useEffect(() => {
    const friend_id = [conversation.user_one, conversation.user_second].find(
      (u) => u !== currentUser.id
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
    setHightLight(arrivalMessage);
  }, [conversation, currentUser, arrivalMessage]);
  if (!friend) <div>Loading</div>;
  return (
    <>
      {friend && (
        <div
          onClick={() => {
            setCurrentChat(conversation);
            setHightLight(false);
          }}
          className={`w-full rounded-lg grid grid-cols-12 gap-3 items-center p-2 hover:bg-gray-200 cursor-pointer transition-all ${
            friend.id == arrivalMessage?.sender && hightLight
              ? "bg-gray-300"
              : ""
          }`}
        >
          <div className="xl:col-span-2 col-span-12 max-w-full w-full">
            <p className="max-w-full m-0">
              <img
                src={friend.avatar ? friend.avatar : "./undraw_profile.svg"}
                className="xl:w-full w-[50px] block rounded-full"
                alt=""
              />
            </p>
          </div>
          <div className="md:col-span-8 md:block hidden">
            <span className="font-bold text-black">
              {friend.firstName + " " + friend.lastName}
            </span>
            {friend.id == arrivalMessage?.sender && (
              <p className="text-black font-bold m-0 flex justify-between">
                <span>{arrivalMessage?.text}</span>
                {hightLight && (
                  <span className="w-[10px] h-[10px] rounded-full bg-blue-500 inline-block"></span>
                )}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ItemConversationCurrent;
