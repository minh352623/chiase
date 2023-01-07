import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AboutProfile from "../../components/AboutProfile.";
import ImagesProfile from "../../components/ImagesProfile";
import ListPost from "../../components/ListPost";
import ProfilePost from "../../components/ProfilePost";
import RenderAvartarFriend from "../../components/RenderAvatarFriend";
import VideoProfile from "../../components/VideoProfile";
import LayoutClient from "../../layouts/LayoutClient";
import Swal from "sweetalert2";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  handleAccept,
  handleFetchFriends,
  handleRefuse,
} from "../../store/reducers/userReducer";
import ListFriend from "../../components/ListFriend";
const Profile = ({ socket }) => {
  const { user } = useSelector((state) => state.auth);
  const { friends, faceioInstance } = useSelector((state) => state.user);

  console.log(friends);
  const dispatch = useDispatch();

  const [profileUser, setProfileUser] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const [tab, setTab] = useState(1);
  const [showChangeIamge, setShowChangeImage] = useState(false);
  const [imgAvatar, setImgAvatar] = useState();
  const [imgBg, setImgBg] = useState();
  const FetchProfile = async () => {
    try {
      const response = await axios({
        url: "auth/admin/user/profile/" + id,
      });
      if (response.status == 200) {
        console.log(response);
        setProfileUser(response.data);
      }
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
      console.log(e);
    }
  };
  useEffect(() => {
    FetchProfile();
  }, [id]);
  const [images, setImages] = useState();
  const fetchImages = async () => {
    try {
      const response = await axios({
        url: "auth/post/getNineImage/?user_id=" + id,
      });
      if (response.status === 200) {
        console.log(response);
        setImages(response.data.convertData);
      }
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  const [friendUser, setFriendsUser] = useState();
  const fetchFriends = async () => {
    try {
      const response = await axios({
        url: "auth/friend/accept/" + id,
      });
      if (response.status == 200) {
        console.log(response);

        setFriendsUser(response.data);
      }
    } catch (e) {
      console.log(e);

      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchImages();
    fetchFriends();

    return () => {};
  }, [id]);
  const showImgAvatar = useRef();
  const showImage = (e) => {
    const [file] = e.target.files;
    console.log(e.target.files);
    setImgAvatar(e.target.files);
    if (file) {
      showImgAvatar.current.src = URL.createObjectURL(file);
    }
  };
  const showImgBg = useRef();

  const showImageBg = (e) => {
    const [file] = e.target.files;
    console.log(e.target.files);
    setImgBg(e.target.files);
    if (file) {
      showImgBg.current.src = URL.createObjectURL(file);
    }
  };
  const [loadingChangeAvatar, setLoadingChangeAvatar] = useState(false);
  const [loadingChangBg, setLoadingChangBg] = useState(false);

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      setLoadingChangeAvatar(true);
      let formData = new FormData();
      formData.append("avatar", imgAvatar[0]);
      const response = await axios({
        method: "PATCH",
        url: "auth/admin/user/changeAvatar/" + id,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      if (response.status === 200) {
        console.log(response);
        setLoadingChangeAvatar(false);

        Swal.fire("Avatar!", "Đổi anh đại diện thành công!", "success");
        setImgAvatar("");
        FetchProfile();
      }
    } catch (e) {
      setLoadingChangeAvatar(false);

      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  const changeBgUser = async (e) => {
    e.preventDefault();
    try {
      setLoadingChangBg(true);
      let formData = new FormData();
      formData.append("background", imgBg[0]);
      const response = await axios({
        method: "PATCH",
        url: "auth/admin/user/changeBackground/" + id,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      if (response.status === 200) {
        console.log(response);
        setLoadingChangBg(false);

        Swal.fire("Hình nền!", "Đổi hình nền thành công!", "success");
        setImgBg("");
        FetchProfile();
      }
    } catch (e) {
      setLoadingChangBg(false);

      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };

  const [desc, setDesc] = useState("");
  const [loadingDesc, setLoadingDesc] = useState(false);
  const updateDescription = async () => {
    setLoadingDesc(true);
    try {
      const response = await axios({
        method: "PATCH",
        url: "auth/admin/user/updateDescription/" + id,

        data: {
          desc,
        },
      });
      if (response.status === 200) {
        console.log(response);
        setLoadingDesc(false);

        Swal.fire("Tiểu sử!", "Cập nhật tiểu sử công!", "success");
        FetchProfile();
      }
    } catch (e) {
      console.log(e);
      setLoadingDesc(false);

      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };

  const addFriend = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: "auth/friend",

        data: {
          sender: user?.id,
          recie: id,
          avatar: user?.avatar,
          text:
            "Bạn có lời mời kết bạn từ " +
            user?.firstName +
            " " +
            user?.lastName,
        },
      });
      if (response.status == 200) {
        Swal.fire("Kết bạn!", "Đã gửi lời mời kết bạn!", "success");
        socket?.emit("addFriend", {
          avatar: user?.avatar,
          senderId: user?.id,
          nameSender: user?.firstName + " " + user?.lastName,
          receiverId: id,
          text:
            "Bạn có lời mời kết bạn từ " +
            user?.firstName +
            " " +
            user?.lastName,
        });
        dispatch(handleFetchFriends());
      }
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  // let check = 0;

  const handleAcceptFriend = async (id_ref) => {
    try {
      await dispatch(
        handleAccept({
          id: id_ref,
          avatar: user?.avatar,
          recie: id,
          text:
            user?.firstName +
            " " +
            user?.lastName +
            " đã chấp nhân lời mời kết bạn của bạn",
        })
      );
      await dispatch(handleFetchFriends());
      socket?.emit("acceptAddFriend", {
        avatar: user?.avatar,
        senderId: user?.id,
        nameSender: user?.firstName + " " + user?.lastName,
        receiverId: id,
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
  const handleRefuseFriend = async (id) => {
    try {
      await dispatch(handleRefuse({ id: id }));
      await dispatch(handleFetchFriends());
    } catch (e) {
      console.log(e);

      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };

  const [option, setOption] = useState(false);

  //đăng kí nhận dạng khuon mat

  return (
    <LayoutClient socket={socket}>
      {showChangeIamge && (
        <div className="popup fixed rounded-lg overflow-x-hidden z-[100] inset-0 bg-[rgba(255,255,255,0.8)] transition-all m-auto flex">
          <div className="py-2 px-3 bg-white rounded-lg shadow_noti xl:w-[50vw] w-[90vw] h-[81vh] m-auto">
            <div className="h-[10%] flex justify-between py-3 border-b-2">
              <span></span>
              <span className="text-2xl text-black font-bold">
                Chỉnh sửa trang cá nhân
              </span>
              <span
                onClick={() => {
                  setShowChangeImage(false);
                  setImgAvatar("");
                  setImgBg("");
                }}
                className="text-2xl w-[35px] h-[35px] cursor-pointer hover:bg-gray-500 transition-all hover:scale-110 flex items-center justify-center rounded-full bg-gray-400"
              >
                x
              </span>
            </div>
            <div className="h-[90%] overflow-y-auto overflow-x-hidden py-2">
              <div className="h-[85%] ">
                <div className="my-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-black text-lg">
                      Ảnh đại diện
                    </span>
                    <form onSubmit={changeAvatar} action="">
                      <label
                        htmlFor="image_avatar"
                        className="px-3 py-2 hover:scale-105 transition-all  bg-gray-200 cursor-pointer rounded-lg text-black"
                      >
                        <span>Tải ảnh lên</span>
                        <input
                          type="file"
                          onChange={showImage}
                          id="image_avatar"
                          className="hidden"
                        />
                      </label>
                      {imgAvatar && !loadingChangeAvatar && (
                        <button
                          type="submit"
                          className="px-3 py-2 ml-3 bg-blue-500 text-white rounded-lg"
                        >
                          Lưu
                        </button>
                      )}
                      {loadingChangeAvatar && (
                        <button
                          type="button"
                          className="px-3 cursor-not-allowed py-2 ml-3 bg-gray-500 text-white rounded-lg"
                        >
                          Đang xử lý...
                        </button>
                      )}
                    </form>
                  </div>
                  <div className="flex my-3 justify-center">
                    <img
                      ref={showImgAvatar}
                      className="w-[200px] rounded-full"
                      src={
                        profileUser?.avatar
                          ? profileUser?.avatar
                          : "../undraw_profile.svg"
                      }
                      alt=""
                    />
                  </div>
                </div>
                <div className="my-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-black text-lg">
                      Ảnh bìa
                    </span>
                    <form onSubmit={changeBgUser} action="">
                      <label
                        htmlFor="bg_user"
                        className="px-3 py-2 hover:scale-105 transition-all bg-gray-200 cursor-pointer rounded-lg text-black"
                      >
                        <span>Tải ảnh lên</span>
                        <input
                          onChange={showImageBg}
                          type="file"
                          id="bg_user"
                          className="hidden"
                        />
                      </label>
                      {imgBg && !loadingChangBg && (
                        <button
                          type="submit"
                          className="px-3 py-2 ml-3 bg-blue-500 text-white rounded-lg"
                        >
                          Lưu
                        </button>
                      )}
                      {loadingChangBg && (
                        <button
                          type="button"
                          className="px-3 cursor-not-allowed py-2 ml-3 bg-gray-500 text-white rounded-lg"
                        >
                          Đang xử lý...
                        </button>
                      )}
                    </form>
                  </div>
                  <div className="flex my-3 justify-center">
                    <img
                      ref={showImgBg}
                      className="w-4/5 block h-[200px] object-cover rounded-lg"
                      src={
                        profileUser?.bg_img
                          ? profileUser.bg_img
                          : "../bg_gay.png"
                      }
                      alt=""
                    />
                  </div>
                </div>
                <div className="my-4">
                  <div className="flex flex-col justify-between">
                    <span className="font-bold text-black text-lg">
                      Tiểu sử
                    </span>
                    <div className="my-3 px-3">
                      <CKEditor
                        editor={ClassicEditor}
                        data={
                          profileUser?.description || "Cập nhật tiểu sử ngay"
                        }
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                          console.log("Editor is ready to use!", editor);
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          console.log("data");
                          console.log({ event, editor, data });
                          setDesc(data);
                        }}
                        onBlur={(event, editor) => {
                          console.log("Blur.", editor);
                        }}
                        onFocus={(event, editor) => {
                          console.log("Focus.", editor);
                        }}
                      />
                    </div>
                    <div className="flex justify-end gap-3 px-3">
                      {desc && !loadingDesc ? (
                        <span
                          onClick={updateDescription}
                          className="px-3 cursor-pointer py-2 bg-blue-500 rounded-lg text-white font-bold"
                        >
                          Lưu
                        </span>
                      ) : (
                        <span className="px-3 py-2 cursor-not-allowed bg-gray-500 rounded-lg text-white font-bold">
                          Lưu
                        </span>
                      )}
                      {loadingDesc && (
                        <span className="px-3 py-2 cursor-not-allowed bg-gray-500 rounded-lg text-white font-bold">
                          Đang xử lý...
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="top_profile h-[85vh] shadow_main pb-3">
        <div className=" container">
          <div className="h-[50vh] bg-profile relative z-[2] w-full rounded-t-lg">
            {profileUser?.bg_img ? (
              <img
                className="h-full max-w-full w-full object-cover rounded-b-2xl"
                src={profileUser?.bg_img}
              />
            ) : (
              <p className="h-full bg-gray-200 max-w-full w-full object-cover rounded-b-2xl" />
            )}
            {+id === +user?.id && (
              <div className="flex gap-3">
                <p
                  onClick={() => setShowChangeImage(true)}
                  className="flex gap-2 text-black absolute hover:scale-105 transition-all  right-[24px] font-bold bg-white px-3 py-2 rounded-xl shadow_main cursor-pointer bottom-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6  h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                    />
                  </svg>
                  <span>Chỉnh sửa ảnh bìa</span>
                </p>
              </div>
            )}
          </div>
          <div className="avatar_profile border-b h-fit flex border-gray-500   justify-between mt-3">
            <div className="flex gap-3 items-stretch flex-1 px-3 ">
              <div className="relative w-[16%] max-w-[16%] top-[-30%] z-10 border-4 rounded-full border-white">
                <img
                  className="w-full rounded-full"
                  src={
                    profileUser?.avatar
                      ? profileUser?.avatar
                      : "../undraw_profile.svg"
                  }
                  alt=""
                />
                {+id === +user?.id && (
                  <span
                    onClick={() => setShowChangeImage(true)}
                    className="absolute right-0 top-2/3 cursor-pointer transition-all hover:scale-105 rounded-full p-2 bg-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="black"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6  h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                      />
                    </svg>
                  </span>
                )}
              </div>
              <div className="flex flex-1 self-start flex-col gap-1 m-0">
                <span className="font-bold text-black text-2xl">
                  {profileUser?.firstName + " " + profileUser?.lastName}
                </span>
                <span className=" font-bold">
                  {friendUser?.length || 0} bạn bè
                </span>
                <div className="flex flex-1  justify-between h-fit leading-none ">
                  {friendUser?.length > 0 ? (
                    <RenderAvartarFriend
                      friendUser={friendUser}
                      id_user={id}
                      size={
                        friendUser.length > 7
                          ? friendUser.length - 2
                          : friendUser.length
                      }
                    ></RenderAvartarFriend>
                  ) : (
                    <span></span>
                  )}

                  <div className="flex  gap-2 h-fit">
                    {+id === +user?.id ? (
                      <>
                        <p className="bg-blue-500 h-fit leading-none p-2 cursor-pointer hover:scale-105 transition-all rounded-lg flex gap-1 items-center">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="white"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </span>
                          <span className="font-bold text-white ">
                            Thêm vào tin
                          </span>
                        </p>
                        <p
                          onClick={() => setShowChangeImage(true)}
                          className="bg-gray-300  h-fit leading-none p-2 cursor-pointer hover:scale-105 transition-all rounded-lg flex gap-2 items-center"
                        >
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="black"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                              />
                            </svg>
                          </span>
                          <span className="font-bold text-black ">
                            Chỉnh sửa trang cá nhân
                          </span>
                        </p>
                      </>
                    ) : friends?.length <= 0 ? (
                      <>
                        <p
                          onClick={addFriend}
                          className="bg-blue-500 h-fit leading-none p-2 cursor-pointer hover:scale-105 transition-all rounded-lg flex gap-1 items-center"
                        >
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6 text-white"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                              />
                            </svg>
                          </span>
                          <span className="font-bold text-white ">
                            Thêm bạn bè
                          </span>
                        </p>
                        <p className="bg-blue-500  h-fit leading-none p-2 cursor-pointer hover:scale-105 transition-all rounded-lg flex gap-2 items-center">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6 text-white "
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                              />
                            </svg>
                          </span>
                          <span className="font-bold text-white  ">
                            Nhắn tin
                          </span>
                        </p>
                      </>
                    ) : friends?.find(
                        (friend) =>
                          +friend.sender === +id || +friend.recie === +id
                      ) ? (
                      friends?.map((friend) => {
                        if (+friend.sender === +id) {
                          if (friend.status === 1) {
                            return (
                              <>
                                <p
                                  onClick={() => handleAcceptFriend(friend.id)}
                                  className="bg-blue-500 h-fit leading-none p-2 cursor-pointer hover:scale-105 transition-all rounded-lg flex gap-1 items-center"
                                >
                                  <span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 text-white"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                  </span>
                                  <span className="font-bold h-6 flex justify-center items-center text-white ">
                                    Chấp nhận
                                  </span>
                                </p>
                                <p
                                  onClick={() => handleRefuseFriend(friend.id)}
                                  className="bg-gray-300 h-fit leading-none p-2 cursor-pointer hover:scale-105 transition-all rounded-lg flex gap-1 items-center"
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
                                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                  </span>
                                  <span className="font-bold h-6 flex justify-center items-center text-back ">
                                    Từ chối
                                  </span>
                                </p>
                                <p className="bg-blue-500  h-fit leading-none p-2 cursor-pointer hover:scale-105 transition-all rounded-lg flex gap-2 items-center">
                                  <span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 text-white "
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                                      />
                                    </svg>
                                  </span>
                                  <span className="font-bold text-white  ">
                                    Nhắn tin
                                  </span>
                                </p>
                              </>
                            );
                          }
                          if (friend.status === 2) {
                            return (
                              <>
                                <div
                                  onClick={() => setOption((option) => !option)}
                                  className="bg-gray-400 relative h-fit leading-none p-2 cursor-pointer transition-all rounded-lg flex gap-1 items-center"
                                >
                                  <span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 text-black"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                                      />
                                    </svg>
                                  </span>
                                  <span className="font-bold h-6 flex justify-center items-center text-black ">
                                    Bạn bè
                                  </span>
                                  {option && (
                                    <div className="absolute w-[300px] bg-white p-3 top-full right-0 rounded-lg shadow_noti ">
                                      <div
                                        onClick={async () => {
                                          await handleRefuseFriend(friend.id);
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
                                        <span className="text-lg">
                                          Hủy kết bạn
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <p className="bg-blue-500  h-fit leading-none p-2 cursor-pointer hover:scale-105 transition-all rounded-lg flex gap-2 items-center">
                                  <span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 text-white "
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                                      />
                                    </svg>
                                  </span>
                                  <span className="font-bold text-white  ">
                                    Nhắn tin
                                  </span>
                                </p>
                              </>
                            );
                          }
                        }
                        if (+friend.recie === +id) {
                          if (friend.status === 1) {
                            return (
                              <>
                                <p
                                  onClick={() => handleRefuseFriend(friend.id)}
                                  className="bg-blue-500 h-fit leading-none p-2 cursor-pointer hover:scale-105 transition-all rounded-lg flex gap-1 items-center"
                                >
                                  <span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 text-white "
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                                      />
                                    </svg>
                                  </span>
                                  <span className="font-bold text-white ">
                                    Hủy lời mời
                                  </span>
                                </p>
                                <p className="bg-blue-500  h-fit leading-none p-2 cursor-pointer hover:scale-105 transition-all rounded-lg flex gap-2 items-center">
                                  <span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 text-white "
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                                      />
                                    </svg>
                                  </span>
                                  <span className="font-bold text-white  ">
                                    Nhắn tin
                                  </span>
                                </p>
                              </>
                            );
                          }
                          if (friend.status === 2) {
                            return (
                              <>
                                <div
                                  onClick={() => setOption((option) => !option)}
                                  className="bg-gray-400 h-fit leading-none p-2 cursor-pointer hover:scale-105 transition-all rounded-lg flex gap-1 items-center"
                                >
                                  <span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 text-black"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                                      />
                                    </svg>
                                  </span>
                                  <span className="font-bold h-6 flex justify-center items-center text-black ">
                                    Bạn bè
                                  </span>
                                  {option && (
                                    <div className="absolute w-[300px] bg-white p-3 top-full right-0 rounded-lg shadow_noti ">
                                      <div
                                        onClick={async () => {
                                          await handleRefuseFriend(friend.id);
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
                                        <span className="text-lg">
                                          Hủy kết bạn
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <p className="bg-blue-500  h-fit leading-none p-2 cursor-pointer hover:scale-105 transition-all rounded-lg flex gap-2 items-center">
                                  <span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 text-white "
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                                      />
                                    </svg>
                                  </span>
                                  <span className="font-bold text-white  ">
                                    Nhắn tin
                                  </span>
                                </p>
                              </>
                            );
                          }
                        }
                      })
                    ) : (
                      <>
                        <p
                          onClick={addFriend}
                          className="bg-blue-500 h-fit leading-none p-2 cursor-pointer hover:scale-105 transition-all rounded-lg flex gap-1 items-center"
                        >
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6 text-white"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                              />
                            </svg>
                          </span>
                          <span className="font-bold text-white ">
                            Thêm bạn bè
                          </span>
                        </p>
                        <p className="bg-gray-300  h-fit leading-none p-2 cursor-pointer hover:scale-105 transition-all rounded-lg flex gap-2 items-center">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="white"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                              />
                            </svg>
                          </span>
                          <span className="font-bold text-black ">
                            Nhắn tin
                          </span>
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <ul className="py-3 m-0 flex gap-3">
              <li
                onClick={() => setTab(1)}
                className={`px-3 py-3 cursor-pointer font-bold  ${
                  tab == 1
                    ? "text-blue-500 before:absolute relative before:h-[3px] before:content-[''] before:block before:bg-blue-500 before:w-full before:bottom-[-2px] before:left-0"
                    : "hover:bg-gray-200 transition-all rounded-lg"
                }`}
              >
                Bài viết
              </li>
              <li
                onClick={() => setTab(2)}
                className={`px-3 py-3 cursor-pointer font-bold  ${
                  tab == 2
                    ? "text-blue-500 before:absolute relative before:h-[3px] before:content-[''] before:block before:bg-blue-500 before:w-full before:bottom-[-2px] before:left-0"
                    : "hover:bg-gray-200 transition-all rounded-lg"
                }`}
              >
                Giới thiệu
              </li>
              <li
                onClick={() => setTab(3)}
                className={`px-3 py-3 cursor-pointer font-bold  ${
                  tab == 3
                    ? "text-blue-500 before:absolute relative before:h-[3px] before:content-[''] before:block before:bg-blue-500 before:w-full before:bottom-[-2px] before:left-0"
                    : "hover:bg-gray-200 transition-all rounded-lg"
                }`}
              >
                Bạn bè
              </li>
              <li
                onClick={() => setTab(4)}
                className={`px-3 py-3 cursor-pointer font-bold  ${
                  tab == 4
                    ? "text-blue-500 before:absolute relative before:h-[3px] before:content-[''] before:block before:bg-blue-500 before:w-full before:bottom-[-2px] before:left-0"
                    : "hover:bg-gray-200 transition-all rounded-lg"
                }`}
              >
                Ảnh
              </li>
              <li
                onClick={() => setTab(5)}
                className={`px-3 py-3 cursor-pointer font-bold  ${
                  tab == 5
                    ? "text-blue-500 before:absolute relative before:h-[3px] before:content-[''] before:block before:bg-blue-500 before:w-full before:bottom-[-2px] before:left-0"
                    : "hover:bg-gray-200 transition-all rounded-lg"
                }`}
              >
                Video
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container my-3">
        {tab === 1 && (
          <ProfilePost
            setTab={setTab}
            id_user={id}
            images={images?.filter((image) => {
              if (!image?.link?.includes("mp4")) return image;
            })}
            desc={profileUser?.description || ""}
            socket={socket}
            friendUser={friendUser?.length > 0 ? friendUser : []}
          ></ProfilePost>
        )}
        {tab === 2 && (
          <AboutProfile
            id_user={id}
            setTab={setTab}
            images={images?.filter((image) => {
              if (!image?.link?.includes("mp4")) return image;
            })}
            socket={socket}
          ></AboutProfile>
        )}
        {tab === 3 && (
          <ListFriend
            handleRefuseFriend={handleRefuseFriend}
            id_user={id}
          ></ListFriend>
        )}
        {tab === 4 && (
          <ImagesProfile
            images={images?.filter((image) => {
              if (!image?.link?.includes("mp4")) return image;
            })}
            socket={socket}
          ></ImagesProfile>
        )}
        {tab === 5 && (
          <VideoProfile
            videos={images?.filter((image) => {
              if (image?.link?.includes("mp4")) return image;
            })}
            socket={socket}
          ></VideoProfile>
        )}
      </div>
    </LayoutClient>
  );
};

export default Profile;
