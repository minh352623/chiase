import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserOnline = ({ user: userF }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const createConversation = async (friend) => {
    console.log(user.id);
    console.log(friend);
    const data = {
      user_one: user.id,
      user_second: friend,
    };
    try {
      const response = await axios({
        method: "post",
        url: "/auth/conversation",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
      console.log(response);
      if (response.status === 200) {
        navigate("/messager");
      }
    } catch (e) {
      console.log(e);
      if (err.response.status == 401) {
        navigate("/login");
      }
    }
  };
  return (
    <div
      onClick={() => createConversation(userF.id)}
      className="p-2 cursor-pointer rounded-lg hover:bg-gray-300 transition-all flex items-center gap-3"
    >
      <span className="relative">
        <img
          className="w-[40px] rounded-full"
          src={userF?.avatar ? userF.avatar : "./undraw_profile.svg"}
          alt=""
        />
        {userF.isOnline && (
          <span className="absolute w-[10px] h-[10px] rounded-full bg-green-600 right-0 bottom-0 border border-[10px] border-white"></span>
        )}
        {!userF.isOnline && (
          <span className="absolute text-sm bg-gray-300 font-bold w-[150%] bottom-[-12px] left-1/2 -translate-x-1/2 rounded-lg px-1 text-green-600">
            1 phút
          </span>
        )}
      </span>
      <span className="font-bold  text-slate-900">
        {userF.firstName + " " + userF.lastName}
      </span>
    </div>
  );
};

export default UserOnline;
