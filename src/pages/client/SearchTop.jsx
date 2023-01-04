import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ListPost from "../../components/ListPost";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import LayoutClient from "../../layouts/LayoutClient";

const SearchTop = ({ socket }) => {
  const { user } = useSelector((state) => state.auth);

  const search = useLocation().search;
  const q = new URLSearchParams(search).get("q");
  console.log(q);
  const [tab, setTab] = useState(1);
  const [friendSearch, setFriendsSearch] = useState();
  const [loadingFetchFriend, setLoadingFetchFriend] = useState(false);
  const navigate = useNavigate();

  const fetchSearchUser = async () => {
    try {
      setLoadingFetchFriend(true);
      const response = await axios({
        url: "auth/friend/search/?q=" + q,
      });

      if (response.status == 200) {
        console.log(response);
        setLoadingFetchFriend(false);

        setFriendsSearch(response.data);
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
    fetchSearchUser();
    checkArr.current = [];
    setTab(1);
    setLimitFriend(5);
  }, [q]);
  let checkArr = useRef([]);
  const [limitFriend, setLimitFriend] = useState(5);
  // const [postSearch, setPostSearch] = useState();
  // const fetchPosts = async () => {
  //   try {
  //     const response = await axios({
  //       url: `/auth/post/searchGlobal/?q=${q}`,
  //     });
  //     if (response.status === 200) {
  //       setPostSearch(response.data);
  //     }
  //   } catch (e) {
  //     console.log(e);

  //     if (e.response.status == 401) {
  //       navigate("/login");
  //     }
  //   }
  // };
  return (
    <LayoutClient search={q} socket={socket}>
      <div className="">
        <div className="grid grid-cols-12">
          <div className="col-span-3  max-h-[92.5vh]">
            <div className="p-3 bg-white shadow_noti max-h-[92.5vh] h-[92.5vh] overflow-y-hidden">
              <div className="py-2 border-b border-gray-500">
                <h5 className="font-bold text-2xl text-black">
                  Kết quả tìm kiếm cho:{" "}
                  <span className="text-blue-500 ">{q}</span>
                </h5>
              </div>
              <div className="my-3 text-black font-semibold text-lg">
                Bộ lọc
              </div>
              <ul className="flex flex-col gap-2">
                <li
                  onClick={() => setTab(1)}
                  className={`flex gap-3 items-center transition-all text-black font-bold hover:bg-gray-300 ${
                    tab == 1 ? "bg-gray-300" : ""
                  } p-2 cursor-pointer rounded-lg`}
                >
                  <span
                    className={`p-2 rounded-full ${
                      tab == 1 ? "bg-blue-500" : "bg-gray-200"
                    } inline-block`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-6 h-6 ${
                        tab == 1 ? "text-white" : "text-black"
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>
                  </span>
                  <span>Bạn bè</span>
                </li>
                <li
                  onClick={() => setTab(2)}
                  className={`flex gap-3 items-center transition-all text-black font-bold hover:bg-gray-300 ${
                    tab == 2 ? "bg-gray-300" : ""
                  } p-2 cursor-pointer rounded-lg`}
                >
                  <span
                    className={`p-2 rounded-full ${
                      tab == 2 ? "bg-blue-500" : "bg-gray-200"
                    } inline-block`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-6 h-6 ${
                        tab == 2 ? "text-white" : "text-black"
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                      />
                    </svg>
                  </span>
                  <span>Bài viết</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-9">
            <div className="container flex justify-center  max-h-[92.5vh] h-[92.5vh] overflow-y-auto w-full items-start pt-5">
              {tab == 1 && (
                <div className="p-3 rounded-xl shadow_search w-2/3 h-fit">
                  <h5 className="font-bold text-black">Mọi người</h5>
                  {loadingFetchFriend ? (
                    <div className="flex w-full items-center gap-3">
                      <span className="rounded-full w-[50px] h-[50px] ">
                        <LoadingSkeleton className="w-full h-full rounded-full"></LoadingSkeleton>
                      </span>
                      <div>
                        <p className="w-[300px] h-[10px] my-1">
                          <LoadingSkeleton className="w-full h-full"></LoadingSkeleton>
                        </p>
                        <p className="w-[300px] h-[10px] my-1">
                          <LoadingSkeleton className="w-full h-full"></LoadingSkeleton>
                        </p>
                      </div>
                    </div>
                  ) : friendSearch?.length > 0 ? (
                    friendSearch?.slice(0, limitFriend).map((friend) => (
                      <div className="flex justify-between w-full items-stretch ">
                        <div className="flex items-center gap-3 my-2">
                          <span className="rounded-full w-[70px] h-[70px] ">
                            <img
                              className="rounded-full"
                              src={
                                friend?.avatar
                                  ? friend.avatar
                                  : "../../undraw_profile.svg"
                              }
                              alt=""
                            />
                          </span>
                          <div>
                            <p className=" my-1 text-black font-bold">
                              {friend?.firstName + " " + friend?.lastName}
                            </p>
                            <p className=" my-1">
                              {friend.profile_data.length > 0 &&
                                friend.profile_data.map((option) => {
                                  if (
                                    !checkArr.current?.includes(
                                      option.option_profile_id
                                    ) &&
                                    checkArr.current?.length < 3
                                  ) {
                                    checkArr.current?.push(
                                      option.option_profile_id
                                    );
                                    if (checkArr.current?.length == 3) {
                                      return (
                                        <span key={option.id}>
                                          {option.value}
                                        </span>
                                      );
                                    } else {
                                      return (
                                        <span key={option.id}>
                                          {option.value} -{" "}
                                        </span>
                                      );
                                    }
                                  }
                                })}
                            </p>
                          </div>
                        </div>
                        <Link
                          className="bg-blue-100 self-center x min-w-[140px] text-center w-[140px] font-bold p-2 h-fit rounded-lg"
                          to={`/profile/${friend.id}`}
                        >
                          Trang cá nhân
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="text-xl font-bold text-center">
                      Không có kết quả cho {q}
                    </div>
                  )}
                  {friendSearch?.length > 5 && limitFriend == 5 && (
                    <span
                      onClick={() => setLimitFriend(friendSearch.length)}
                      className=" font-bold text-semibold cursor-pointer hover:bg-red-500  text-black  mt-3 block text-center bg-gray-300 py-1 rounded-lg"
                    >
                      Xem tất cả
                    </span>
                  )}
                  {friendSearch?.length > 5 &&
                    limitFriend == friendSearch?.length && (
                      <span
                        onClick={() => setLimitFriend(5)}
                        className=" font-bold text-semibold cursor-pointer hover:bg-red-500  text-black  mt-3 block text-center bg-gray-300 py-1 rounded-lg"
                      >
                        Ẩn bớt
                      </span>
                    )}
                </div>
              )}
              {tab == 2 && (
                <div className="rounded-xl shadow_search w-2/3 h-fit">
                  <ListPost q={q ? q : ""} socket={socket}></ListPost>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </LayoutClient>
  );
};

export default SearchTop;
