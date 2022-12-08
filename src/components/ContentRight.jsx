import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserOnline from "./UserOnline";

const ContentRight = () => {
  const [userOnline, setUserOnline] = useState();
  const navigate = useNavigate();

  const FetchUserOnline = async () => {
    try {
      const response = await axios({
        url: `/auth/admin/user/home`,
      });
      console.log(response);
      if (response.status === 200) {
        setUserOnline(response.data);
      }
    } catch (e) {
      console.log(e);
      if (err.response.status == 401) {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    FetchUserOnline();
  }, []);
  return (
    <div className="h-">
      <div className="border-t border-t-2 border-gray-300">
        <div className="title">
          <span className="py-2 font-bold text-gray-700 text-lg block">
            Người liên hệ
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
