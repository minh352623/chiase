import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuggestUser from "./SuggestUser";
import UserOnline from "./UserOnline";

const ContentRight = ({ userOnlineCurrent }) => {
  const [userOnline, setUserOnline] = useState();
  const [userSuggest, setUserSuggest] = useState();
  const navigate = useNavigate();

  const FetchUserOnline = async () => {
    try {
      const response = await axios({
        url: `/auth/admin/user/home`,
      });
      console.log(response);
      if (response.status === 200) {
        setUserOnline(
          response.data.filter((u) =>
            userOnlineCurrent?.some((o) => o.userId === u.id)
          )
        );
      }
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  const fetchUserSuggest = async () => {
    try {
      const response = await axios({
        url: `/auth/admin/user/suggest`,
      });
      if (response.status === 200) {
        setUserSuggest(response.data);
      }
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    FetchUserOnline();
    fetchUserSuggest();
  }, []);
  // if()
  return (
    <div className="h-">
      <div className="  border-gray-300">
        <div className="title">
          <span className="py-2 font-bold text-gray-700 text-lg block">
            Gợi ý cho bạn
          </span>

          <div className="list_friend">
            {userSuggest &&
              userSuggest.map((user) => (
                <SuggestUser
                  key={user.id}
                  suggest={true}
                  user={user}
                ></SuggestUser>
              ))}
          </div>
        </div>
      </div>
      <div className=" border-t-2 border-gray-300">
        <div className="title">
          <span className="py-2 font-bold text-gray-700 text-lg block">
            Người liên hệ online
          </span>

          <div className="list_friend">
            {userOnline &&
              userOnline.map((user) => (
                <UserOnline key={user.id} user={user}></UserOnline>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentRight;
