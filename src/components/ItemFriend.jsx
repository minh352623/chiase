import React, { useState } from "react";
import { Link } from "react-router-dom";

const ItemFriend = ({ friend, id_ref, handleRefuseFriend, fetchFriends }) => {
  const [option, setOption] = useState(false);
  return (
    <div className="col-span-6">
      <div className="flex justify-between  items-center p-3 rounded border">
        <Link to={`/profile/${friend.id}`} className="flex items-center gap-5">
          <p className="m-0 w-[70%]">
            <img
              className="min-w-[120px] max-w-[120px] object-cover min-h-[120px] hover:scale-105 w-full transition-all rounded-lg border"
              src={friend.avatar ? friend.avatar : "../undraw_profile.svg"}
              alt=""
            />
          </p>
          <p className="font-bold css_dot hover:underline text-sm text-black my-2">
            {friend.firstName + " " + friend.lastName}
          </p>
        </Link>
        <div className="p-3 relative cursor-pointer bg-gray-200   focus-within:hover:bg-[red] rounded-full text-gray-700  m-0 text-2xl leading-[30px] w-[30px] h-[30px] flex items-center justify-center">
          <span
            onClick={() => setOption((option) => !option)}
            className="hover:scale-105 transition-all"
          >
            <i class="fa-solid fa-ellipsis"></i>
          </span>
          {option && (
            <div className="absolute w-[300px] bg-white p-3 top-full right-0 rounded-lg shadow_noti ">
              <div
                onClick={async () => {
                  await handleRefuseFriend(id_ref);
                  await fetchFriends();
                }}
                className="flex text-black font-bold hover:bg-gray-300 rounded-lg gap-3 p-2"
              >
                <span>
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
                      d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                    />
                  </svg>
                </span>
                <span className="text-lg">Hủy kết bạn</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemFriend;
