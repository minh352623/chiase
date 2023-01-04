import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LayoutClient from "../../layouts/LayoutClient";
import {
  handleAccept,
  handleFetchFriends,
  handleFetchRequestFriend,
  handleRefuse,
} from "../../store/reducers/userReducer";

const Friends = ({ socket }) => {
  const { requestFriend } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleAcceptFriend = async (friend) => {
    try {
      await dispatch(
        handleAccept({
          id: friend.id,
          avatar: user?.avatar,
          recie: friend.sender,
          text:
            user?.firstName +
            " " +
            user?.lastName +
            " đã chấp nhân lời mời kết bạn của bạn",
        })
      );
      await dispatch(handleFetchFriends());
      await dispatch(handleFetchRequestFriend());

      socket?.emit("acceptAddFriend", {
        avatar: user?.avatar,
        senderId: user?.id,
        nameSender: user?.firstName + " " + user?.lastName,
        receiverId: +friend.sender,
        text:
          user?.firstName +
          " " +
          user?.lastName +
          " đã chấp nhân lời mời kết bạn của bạn",
      });
    } catch (e) {
      console.log(e);

      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  const handleRefuseFriend = async (friend) => {
    try {
      await dispatch(handleRefuse({ id: friend.id }));
      await dispatch(handleFetchFriends());
      await dispatch(handleFetchRequestFriend());
    } catch (e) {
      console.log(e);

      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  return (
    <LayoutClient socket={socket}>
      <div className="bg_anima h-[92.5vh] w-full">
        <div className="container my-3">
          <p className="text-2xl font-bold text-black">Lời mời kết bạn</p>
          <div className="grid grid-cols-12 gap-3">
            {requestFriend?.length > 0 ? (
              requestFriend.map((friend) => (
                <div key={friend.id} className="col-span-3">
                  <div className="shadow_noti bg-white  rounded-xl">
                    <Link
                      to={`/profile/${friend.sender}`}
                      className="flex items-center justify-center"
                    >
                      <img
                        className="h-[200px] w-full rounded-t-lg object-cover"
                        src={
                          friend?.sender_data?.avatar || "../undraw_profile.svg"
                        }
                        alt=""
                      />
                    </Link>
                    <div className="p-3">
                      <Link
                        to={`/profile/${friend.sender}`}
                        className="text-black font-semibold"
                      >
                        {friend?.sender_data.firstName +
                          " " +
                          friend?.sender_data.lastName}
                      </Link>
                      <div>
                        <p
                          onClick={() => handleAcceptFriend(friend)}
                          className="px-3 transition-all hover:scale-105 py-2 my-1 rounded-lg bg-blue-500 font-bold text-white cursor-pointer text-center"
                        >
                          Xác nhận
                        </p>
                        <p
                          onClick={() => handleRefuseFriend(friend)}
                          className="px-3 transition-all hover:scale-105 py-2 m-0 rounded-lg bg-gray-400 font-bold text-black cursor-pointer text-center"
                        >
                          Hủy
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xl col-span-12 w-full font-semibold text-red-500 flex item-center justify-center">
                Chưa có lời mời kết bạn
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutClient>
  );
};

export default Friends;
