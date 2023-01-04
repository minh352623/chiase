import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { imageExists } from "../trait/CheckImageExits";
import ListPost from "./ListPost";
import Profile from "./Profile";
import Status from "./Status";

const ProfilePost = ({ socket, images, setTab, id_user, desc, friendUser }) => {
  const { user } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState();
  const fetchProfile = async () => {
    try {
      const response = await axios({
        url: "/auth/profile/fetchAll/?user_id=" + id_user,
      });
      if (response.status === 200) {
        console.log(response);
        let arrNew = {};
        response.data.data.forEach((item) => {
          if (arrNew[item.option_profile_id]?.length > 0) {
            arrNew[item.option_profile_id].push(item);
          } else {
            arrNew[item.option_profile_id] = [];

            arrNew[item.option_profile_id].push(item);
          }
        });

        setProfile(arrNew);
      }
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-5">
        <div className="introduce  p-3 rounded-xl shadow_main bg-white ">
          <h5 className="font-bold text-black">Giới thiệu</h5>
          {desc && (
            <div
              dangerouslySetInnerHTML={{ __html: desc }}
              className="border-b border-gray-400 mb-3 flex items-center justify-center"
            ></div>
          )}
          <ul>
            {profile &&
              Object.keys(profile).length > 0 &&
              Object.keys(profile).map((item) => (
                <Profile
                  key={item}
                  id_user={id_user}
                  item={profile[item]}
                ></Profile>
              ))}
            {!profile && (
              <div className="flex  items-center justify-center text-black">
                Không có dữ liệu
              </div>
            )}
          </ul>
        </div>
        <div className="introduce mt-3 p-3 rounded-xl shadow_main bg-white ">
          <div className="flex justify-between mb-2 items-center">
            <h5 className="font-bold text-black">Ảnh</h5>
            <span
              onClick={() => setTab(4)}
              className="text-blue-500 text-lg p-2 rounded-lg cursor-pointer transition-all hover:bg-blue-200"
            >
              Xem tất cả ảnh
            </span>
          </div>
          <div className="grid grid-cols-12 gap-3">
            {images &&
              images.slice(0, 9).map((image) => {
                if (imageExists(image?.link)) {
                  return (
                    <div
                      key={image.id}
                      className="col-span-4 h-full max-h-[150px]"
                    >
                      <div className="rounded-lg h-full">
                        <img
                          src={image?.link}
                          className="object-cover w-full rounded-lg h-full"
                          alt=""
                        />
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
        <div className="introduce mt-3 p-3 rounded-xl shadow_main bg-white ">
          <div className="flex justify-between mb-2 items-center">
            <h5 className="font-bold text-black">Bạn bè</h5>
            <span
              onClick={() => setTab(3)}
              className="text-blue-500 text-lg p-2 rounded-lg cursor-pointer transition-all hover:bg-blue-200"
            >
              Xem tất bạn bè
            </span>
          </div>
          <div className="grid grid-cols-12 gap-3">
            {friendUser &&
              friendUser.slice(0, 9).map((friend) => {
                if (+friend.recie_data.id != +id_user) {
                  return (
                    <Link
                      to={`/profile/${friend.recie_data.id}`}
                      className="col-span-4"
                    >
                      <p className="m-0">
                        <img
                          className="hover:scale-105 w-full min-w-[120px] min-h-[120px] transition-all rounded-lg border"
                          src={
                            friend.recie_data.avatar
                              ? friend.recie_data.avatar
                              : "../undraw_profile.svg"
                          }
                          alt=""
                        />
                      </p>
                      <p className="font-bold css_dot hover:underline text-sm text-black my-2">
                        {friend.recie_data.firstName +
                          " " +
                          friend.recie_data.lastName}
                      </p>
                    </Link>
                  );
                }
                if (+friend.sender_data.id != +id_user) {
                  return (
                    <Link
                      to={`/profile/${friend.sender_data.id}`}
                      className="col-span-4"
                    >
                      <p className="m-0">
                        <img
                          className="hover:scale-105 w-full min-w-[120px] min-h-[120px] transition-all rounded-lg border"
                          src={
                            friend.sender_data.avatar
                              ? friend.sender_data.avatar
                              : "../undraw_profile.svg"
                          }
                          alt=""
                        />
                      </p>
                      <p className="font-bold css_dot hover:underline text-sm text-black my-2">
                        {friend.sender_data.firstName +
                          " " +
                          friend.sender_data.lastName}
                      </p>
                    </Link>
                  );
                }
              })}
          </div>
        </div>
      </div>
      <div className="col-span-7">
        {+id_user === +user?.id && <Status user={user}></Status>}
        <div className={`${+id_user == +user?.id ? "mt-3" : "-mt-4"}`}>
          <ListPost id_user={id_user} socket={socket}></ListPost>
        </div>
      </div>
    </div>
  );
};

export default ProfilePost;
