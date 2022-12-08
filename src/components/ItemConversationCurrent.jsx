import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ItemConversationCurrent = ({ conversation, currentUser }) => {
  const [friend, setFriend] = useState();
  const navigate = useNavigate();

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
  }, [conversation, currentUser]);
  if (!friend) <div>Loading</div>;
  return (
    <>
      {friend && (
        <div className="w-full rounded-lg grid grid-cols-12 gap-3 items-center p-2 hover:bg-gray-200 cursor-pointer transition-all">
          <div className="col-span-2">
            <p className="w-full m-0">
              <img
                src={friend.avatar ? friend.avatar : "./undraw_profile.svg"}
                className="w-full block rounded-full"
                alt=""
              />
            </p>
          </div>
          <div className="col-span-8">
            <span className="font-bold text-black">
              {friend.firstName + " " + friend.lastName}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemConversationCurrent;
