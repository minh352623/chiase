import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const SuggestUser = ({ user: userF, suggest }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div
      //   onClick={() => createConversation(userF.id)}
      className="p-2 cursor-pointer rounded-lg  transition-all flex items-center gap-3"
    >
      <span className="relative w-[10%]">
        <img
          className="w-[40px] rounded-full"
          src={userF?.avatar ? userF.avatar : "./undraw_profile.svg"}
          alt=""
        />
      </span>
      <div className="flex justify-between w-[90%]">
        <div className="flex-1 css_dot">
          <div className="flex flex-col">
            <Link
              to={`/profile/${userF.id}`}
              className="hover:underline block font-bold  text-slate-900"
            >
              {userF.firstName + " " + userF.lastName}
            </Link>
            <span className="text-sm font-bold">Gợi ý cho bạn</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestUser;
