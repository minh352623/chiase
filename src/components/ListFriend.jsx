import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ItemFriend from "./ItemFriend";
import lodash from "lodash";
import LoadingAdmin from "./LoadingAdmin";
import { useEffect } from "react";
import axios from "axios";

const ListFriend = ({ id_user, handleRefuseFriend }) => {
  const [queryFriend, setQueryFriend] = useState("");
  const navigate = useNavigate();

  const [tabFriend, setTabFriend] = useState(1);
  const setQueryFriendItem = lodash.debounce((e) => {
    setQueryFriend(e.target.value);
  }, 500);
  const [friendUser, setFriendsUser] = useState();
  const [loadingFetchFriend, setLoadingFetchFriend] = useState(false);
  const fetchFriends = async () => {
    try {
      setLoadingFetchFriend(true);
      const response = await axios({
        url: "auth/friend/accept/" + id_user + "/?keyword=" + queryFriend,
      });
      if (response.status == 200) {
        console.log(response);
        setLoadingFetchFriend(false);

        setFriendsUser(response.data);
      }
    } catch (e) {
      console.log(e);
      setLoadingFetchFriend(false);

      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    fetchFriends();
    return () => {};
  }, [id_user, queryFriend]);
  return (
    <div className="rounded-lg bg-white shadow_noti px-3 py-2">
      <div className="my-2 flex justify-between items-center">
        <span className="font-bold text-xl text-black">Bạn bè</span>
        <div className="flex gap-3">
          <div className="relative">
            <input
              type="text"
              onChange={setQueryFriendItem}
              className="outline-none text-black py-2 bg-gray-200 rounded-full pr-3 pl-5"
              placeholder="Tìm kiếm"
            />
            <span className="absolute top-1/2 -translate-y-1/2 left-[12px]">
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
          <Link
            to="/friends"
            className="p-2 rounded-lg text-blue-500 font-bold cursor-pointer hover:bg-blue-100 transition-all"
          >
            Lời mời kết bạn
          </Link>
          <Link
            to="/friends"
            className="p-2 rounded-lg text-blue-500 font-bold cursor-pointer hover:bg-blue-100 transition-all"
          >
            Tìm bạn bè
          </Link>
        </div>
      </div>
      <ul className="my-2 flex gap-3 items-center">
        <li
          onClick={() => setTabFriend(1)}
          className={`px-3 py-3 cursor-pointer font-bold  ${
            tabFriend == 1
              ? "text-blue-500 before:absolute relative before:h-[3px] before:content-[''] before:block before:bg-blue-500 before:w-full before:bottom-[0] before:left-0"
              : "hover:bg-gray-200 transition-all rounded-lg"
          }`}
        >
          Tất cả bạn bè
        </li>
        <li
          onClick={() => setTabFriend(1)}
          className={`px-3 py-3 cursor-pointer font-bold  ${
            tabFriend == 2
              ? "text-blue-500 before:absolute relative before:h-[3px] before:content-[''] before:block before:bg-blue-500 before:w-full before:bottom-[0] before:left-0"
              : "hover:bg-gray-200 transition-all rounded-lg"
          }`}
        >
          Sinh nhật
        </li>
      </ul>
      {loadingFetchFriend && <LoadingAdmin></LoadingAdmin>}
      {!loadingFetchFriend && (
        <div className="my-2 grid grid-cols-12 gap-3">
          {friendUser?.length > 0 ? (
            friendUser.map((friend) => {
              if (friend.recie_data.id != id_user) {
                return (
                  <ItemFriend
                    handleRefuseFriend={handleRefuseFriend}
                    id_ref={friend.id}
                    fetchFriends={fetchFriends}
                    friend={friend.recie_data}
                  ></ItemFriend>
                );
              }
              if (friend.sender_data.id != id_user) {
                return (
                  <ItemFriend
                    fetchFriends={fetchFriends}
                    handleRefuseFriend={handleRefuseFriend}
                    id_ref={friend.id}
                    friend={friend.sender_data}
                  ></ItemFriend>
                );
              }
            })
          ) : !queryFriend ? (
            <div className="text-red-500 xol-span-12 w-full font-bold my-3">
              {" "}
              Chưa có bạn bè
            </div>
          ) : (
            <div className="font-bold text-xl col-span-12 text-center my-3">
              Không có kết quả cho từ khóa: {queryFriend}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ListFriend;
