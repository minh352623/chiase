import React, { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import LoadingAdmin from "./LoadingAdmin";
import lodash from "lodash";
import { CaculateTime } from "../trait/CaculateTime";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import RenderComment from "./RenderComment";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import CommentPost from "./CommentPost";

const PostHome = ({
  item,
  createLikePost,
  user,
  createComment,
  loadingComment,
  createLikeComment,
  handleEditPostParent,
  handleDeltePost,
  socket,
}) => {
  const [showFormComment, setShowFormComment] = useState(true);
  console.log(showFormComment);

  const caculateTime = (time) => {
    let message = "abc";
    if (time < 1) {
      message = parseFloat(time * 60).toFixed(0) + " phút";
    }
    if (time >= 1 && time < 24) {
      message = parseFloat(time).toFixed(0) + " giờ";
    }
    if (time > 24) {
      message = parseFloat(time / 24).toFixed(0) + " ngày";
    }

    return message;
  };
  const createLikePostHome = async (id_post, ownPost, status) => {
    createLikePost(id_post, ownPost, status);
  };
  const [showComment, setShowComment] = useState(1);
  const [content, setContent] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const inputComment = useRef();
  const navigate = useNavigate();

  const onEmojiClick = (event, emojiObject) => {
    console.log(event);
    inputComment.current.value = content + " " + event.emoji;
    setContent((pre) => pre + " " + event.emoji);
    setShowEmoji(false);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const data = await createComment(file, content, item?.id, item.user_id);
      if (data) {
        setContent("");
        setFile("");
        showImg.current ? (showImg.current.src = "") : "";
        inputComment.current.value = "";
      }
    } catch (e) {
      console.log(e);
    }
  };
  const showImg = useRef();
  const [file, setFile] = useState("");
  const showImage = (e) => {
    // showImg.current.parentElement.parentElement.classList.remove("");
    const [file] = e.target.files;
    if (file) {
      showImg.current.src = URL.createObjectURL(file);
    }
    setFile(e.target.files);
  };

  const handleLikeComment = async (idComment, ownComment, status) => {
    try {
      const data = await createLikeComment(
        idComment,
        ownComment,
        item.user_data?.firstName + " " + item.user_data?.lastName,
        status
      );
    } catch (e) {
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };

  //share post
  const [loading, setLoading] = useState(false);
  const textarea = useRef();
  const createStatus = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("content", contentShare);
    formData.append("user_id", user?.id);
    formData.append("share_post_id", item?.post_data_two?.id || item?.id);

    try {
      setLoading(true);
      const response = await axios({
        method: "post",
        url: "/auth/post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      if (response.status === 200) {
        // navigate("/admin/user");
        toast.success(`Chia sẻ bài viết thành công!`, {
          position: "bottom-left",
          autoClose: 1500,
        });
        console.log(response);
        setContentShare("");
        setSharePost(false);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);

      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  const [sharePost, setSharePost] = useState(false);
  const [contentShare, setContentShare] = useState("");
  const onEmojiClickShare = (event, emojiObject) => {
    console.log(event);
    textarea.current.value = contentShare + " " + event.emoji;
    setContentShare((pre) => pre + " " + event.emoji);
    setShowEmoji(false);
  };
  const [loadingShare, setLoadingShare] = useState(false);
  const [dataSharePost, setDataSharePost] = useState("");
  const createPostShare = async (id_post_share) => {
    try {
      setSharePost(true);
      console.log(contentShare);
      console.log(id_post_share);

      const response = await axios({
        method: "GET",
        url: "/auth/post/detail/" + id_post_share,
      });
      if (response.status === 200) {
        console.log(response);
        setLoadingShare(false);
        setDataSharePost(response.data);
      }
    } catch (e) {
      setLoadingShare(false);
      console.log(e);
      if (e.response.status == 404) {
        Swal.fire("Bài viết!", e.response.data, "error");
      }
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  //end share post
  const deletePost = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = handleDeltePost(id);
          setOptionPost(false);
        } catch (e) {
          console.log(e);
        }
      }
    });
  };

  const [optionPost, setOptionPost] = useState(false);

  //edit post
  const [showEditPost, setShowEditPost] = useState(false);
  const [dataEditPost, setDataEditPost] = useState();
  const [loadingEditPost, setLoadingEditPost] = useState(false);
  const [contentEdit, setContentEdit] = useState();
  const handleEditPost = async (id) => {
    try {
      setLoadingEditPost(true);
      setShowEditPost(true);
      const response = await axios({
        method: "GET",
        url: "/auth/post/detail/" + id,
      });
      if (response.status === 200) {
        console.log(response);
        setLoadingEditPost(false);

        setDataEditPost(response.data);
      }
    } catch (e) {
      setLoadingEditPost(false);
      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  const editStatus = (e) => {
    e.preventDefault();
    try {
      const response = handleEditPostParent(item.id, contentEdit);
    } catch (e) {
      console.log(e);
    }
  };
  //end edit post

  //report
  const [showReport, setShowReport] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);
  const [optiosReport, setOptionsReport] = useState();
  const fetchOptions = async () => {
    try {
      setLoadingReport(true);
      setShowReport(true);
      const response = await axios({
        url: `/auth/admin/option_report/getAll`,
        // headers: {
        //   Accept: "application/json;charset=UTF-8",
        // },
      });
      if (response.status == 200) {
        console.log(response);
        setOptionsReport(response.data);
        setLoadingReport(false);
      }
    } catch (e) {
      setLoadingReport(false);
      console.log(e);
      if (e.response.status == 401) {
        navigate("/admin/login");
      }
    }
  };

  const createReportToAdmin = async (data) => {
    try {
      const response = await axios({
        method: "POST",
        url: `/auth/report`,
        data: {
          post_id: item?.id,
          user_id_report: user?.id,
          option_id_report: data?.id,
        },
      });
      if (response.status == 200) {
        setShowReport(false);
        socket?.emit("reportToAdmin", {
          user_id_report: user?.id,
        });
        toast.success(
          `Cảm ơn đã báo cáo! Chúng tôi sẻ phản hồi trong thời gian sớm nhất`,
          {
            position: "bottom-left",
            autoClose: 2000,
          }
        );
      }
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        navigate("/admin/login");
      }
    }
  };
  //end report

  const renderUserComment = (arr) => {
    let arrNew = [];
    arrNew.push(arr[0]);
    console.log(arr);

    for (let i = 0; i < arr.length; i++) {
      let check = 0;
      let item;
      for (let j = 0; j < arrNew.length; j++) {
        if (arr[i]?.user_id == arrNew[j]?.user_id) {
          check = 1;
          break;
        }
        item = arr[i];
      }
      if (check == 0) {
        arrNew.push(item);
      }
    }
    console.log(arrNew);
    return arrNew;
  };

  return (
    <div className="shadow_main py-3 bg-white my-3 rounded-xl">
      {showReport && (
        <div className="popup fixed z-[10] inset-0 bg-[rgba(255,255,255,0.5)] transition-all m-auto flex">
          <div className="py-2 px-3 bg-white shadow_main xl:w-[40vw] w-[90vw] h-[80vh] m-auto">
            <div className="h-[10%] flex justify-between py-3 border-b-2">
              <span></span>
              <span className="text-2xl text-black font-bold">Báo cáo</span>
              <span
                onClick={() => {
                  setSharePost(false);
                  setContentShare("");
                }}
                className="text-2xl w-[35px] h-[35px] cursor-pointer hover:bg-gray-500 transition-all hover:scale-110 flex items-center justify-center rounded-full bg-gray-400"
              >
                x
              </span>
            </div>
            <div className="h-[90%] overflow-y-auto py-2">
              <div className="h-[15%]">
                <div className="flex flex-col gap-3">
                  <p className="font-bold m-0 text-black text-2xl">
                    Hãy chọn vấn đề
                  </p>
                  <div>
                    Nếu bạn nhận thấy ai đó đang gặp nguy hiểm, đừng chần chừ mà
                    hãy tìm ngay sự giúp đỡ trước khi báo cáo với Admin.
                  </div>
                </div>
              </div>
              <div className="h-[75%]  mt-5 overflow-y-auto">
                {optiosReport &&
                  optiosReport.map((option) => (
                    <div
                      onClick={() => createReportToAdmin(option)}
                      className="flex gap-3 items-center cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
                    >
                      <p className="w-[8%] m-0">
                        <img
                          src={option?.img}
                          className="w-full object-cover rounded-full"
                          alt=""
                        />
                      </p>
                      <p className="text-black font-bold text-xl m-0">
                        {option.text}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditPost && (
        <div className="popup fixed z-[10] inset-0 bg-[rgba(255,255,255,0.5)] transition-all m-auto flex">
          <div className="py-2 px-3 bg-white shadow_main xl:w-[40vw] w-[90vw] h-[80vh] m-auto">
            <div className="h-[10%] flex justify-between py-3 border-b-2">
              <span></span>
              <span className="text-2xl text-black font-bold">
                Chỉnh sửa bài viết
              </span>
              <span
                onClick={() => {
                  setShowEditPost(false);
                }}
                className="text-2xl w-[35px] h-[35px] cursor-pointer hover:bg-gray-500 transition-all hover:scale-110 flex items-center justify-center rounded-full bg-gray-400"
              >
                x
              </span>
            </div>
            <div className="h-[90%] overflow-y-auto py-2">
              <div className="h-[15%]">
                <div className="flex gap-3">
                  <span className="w-[45px]">
                    <img
                      className="rounded-full"
                      src={user?.avatar ? user.avatar : "./undraw_profile.svg"}
                      alt=""
                    />
                  </span>
                  <div>
                    <p className="font-bold m-0 text-black">
                      {user.firstName + " " + user.lastName}
                    </p>
                    <p className="m-0 font-semibold text-black flex gap-1 bg-gray-300 rounded-full text-center justify-center items-center">
                      <span>
                        <img
                          className="w-[15px]"
                          src="./planet-earth.png"
                          alt=""
                        />
                      </span>
                      <span>Công khai</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-[85%] ">
                <form
                  encType="multipart/form-data"
                  onSubmit={editStatus}
                  action=""
                  method="post"
                  className="h-full"
                >
                  <div className="h-[90%] overflow-y-auto">
                    {loadingShare && <LoadingAdmin></LoadingAdmin>}
                    {!loadingEditPost && dataEditPost && (
                      <>
                        <textarea
                          ref={textarea}
                          name="content"
                          id=""
                          defaultValue={dataEditPost?.content}
                          onChange={(e) => setContentEdit(e.target.value)}
                          className="p-3 outline-none w-full resize-none h-[30%] text-black"
                          placeholder="Bạn đang nghĩ gì thế?"
                        ></textarea>
                        <div className="relative min-h-[40%] p-2 border-2 border-slate-400 rounded-lg">
                          <div className="grid grid-cols-12 gap-2">
                            {dataEditPost?.file_data.length > 1 ? (
                              dataEditPost?.file_data.map((item) => (
                                <div className="col-span-6">
                                  <img
                                    className="w-full"
                                    src={item?.link}
                                    alt=""
                                  />
                                </div>
                              ))
                            ) : (
                              <div className="col-span-12">
                                <img
                                  className="w-full"
                                  src={dataEditPost?.file_data[0]?.link}
                                  alt=""
                                />
                              </div>
                            )}
                          </div>
                          {dataEditPost.post_data_two &&
                          dataEditPost.share_post_id ? (
                            <div className="share_content px-3 mt-3">
                              {dataEditPost.post_data_two?.file_data.length >
                              1 ? (
                                dataEditPost.post_data_two?.file_data.map(
                                  (item) => (
                                    <div className="col-span-6">
                                      <img
                                        className="w-full"
                                        src={item?.link}
                                        alt=""
                                      />
                                    </div>
                                  )
                                )
                              ) : (
                                <div className="col-span-12">
                                  <img
                                    className="w-full"
                                    src={
                                      dataEditPost.post_data_two?.file_data[0]
                                        ?.link
                                    }
                                    alt=""
                                  />
                                </div>
                              )}
                              <div className="flex  gap-3 mt-2">
                                <span className="w-[45px]">
                                  <img
                                    className="w-full rounded-full"
                                    src={
                                      dataEditPost.post_data_two.user_data
                                        .avatar
                                        ? dataEditPost.post_data_two.user_data
                                            .avatar
                                        : "./undraw_profile.svg"
                                    }
                                    alt=""
                                  />
                                </span>
                                <p className="font-bold text-black flex flex-col">
                                  <span>
                                    {dataEditPost.post_data_two.user_data
                                      .firstName +
                                      " " +
                                      dataEditPost.post_data_two.user_data
                                        .lastName}
                                  </span>
                                  <span className="text-gray-600 m-0">
                                    {caculateTime(
                                      parseFloat(
                                        Math.floor(
                                          new Date() -
                                            new Date(
                                              dataEditPost.post_data_two.createdAt
                                            )
                                        ) /
                                          1000 /
                                          60 /
                                          60
                                      ).toFixed(2)
                                    )}
                                  </span>
                                </p>
                              </div>
                              <div className="text-black fonr-bold ">
                                {dataEditPost.post_data_two?.content}
                              </div>
                            </div>
                          ) : (
                            !dataEditPost.post_data_two &&
                            dataEditPost.share_post_id && (
                              <div className="mt-3 border rounded-xl mx-3 p-3 bg-gray-400">
                                <p className="text-bold text-black font-semibold">
                                  Bài viết này đã bị xóa hoặc không tồn tại
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="w-full h-[10%]  flex items-center justify-center">
                    {loading && (
                      <button
                        disabled
                        className="cursor-not-allowed w-full text-center mt-3 bg-blue-500 py-1 rounded-lg text-slate-50 text-lg font-bold"
                        type="submit"
                      >
                        <LoadingAdmin></LoadingAdmin>
                      </button>
                    )}
                    {!loading && (
                      <button
                        className="w-full bg-blue-500 py-1 rounded-lg text-slate-50 text-lg font-bold"
                        type="submit"
                      >
                        Đăng
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {sharePost && (
        <div className="popup fixed z-[10] inset-0 bg-[rgba(255,255,255,0.5)] transition-all m-auto flex">
          <div className="py-2 px-3 bg-white shadow_main xl:w-[40vw] w-[90vw] h-[80vh] m-auto">
            <div className="h-[10%] flex justify-between py-3 border-b-2">
              <span></span>
              <span className="text-2xl text-black font-bold">
                Chia sẻ bài viết
              </span>
              <span
                onClick={() => {
                  setSharePost(false);
                  setContentShare("");
                }}
                className="text-2xl w-[35px] h-[35px] cursor-pointer hover:bg-gray-500 transition-all hover:scale-110 flex items-center justify-center rounded-full bg-gray-400"
              >
                x
              </span>
            </div>
            <div className="h-[90%] overflow-y-auto py-2">
              <div className="h-[15%]">
                <div className="flex gap-3">
                  <span className="w-[45px]">
                    <img
                      className="rounded-full"
                      src={user?.avatar ? user.avatar : "./undraw_profile.svg"}
                      alt=""
                    />
                  </span>
                  <div>
                    <p className="font-bold m-0 text-black">
                      {user.firstName + " " + user.lastName}
                    </p>
                    <p className="m-0 font-semibold text-black flex gap-1 bg-gray-300 rounded-full text-center justify-center items-center">
                      <span>
                        <img
                          className="w-[15px]"
                          src="./planet-earth.png"
                          alt=""
                        />
                      </span>
                      <span>Công khai</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-[85%] ">
                <form
                  encType="multipart/form-data"
                  onSubmit={createStatus}
                  action=""
                  method="post"
                  className="h-full"
                >
                  <div className="h-[90%] overflow-y-auto">
                    <textarea
                      ref={textarea}
                      name="content"
                      id=""
                      onChange={(e) => setContentShare(e.target.value)}
                      className="p-3 outline-none w-full resize-none h-[30%] text-black"
                      placeholder="Bạn đang nghĩ gì thế?"
                    ></textarea>

                    {loadingShare && <LoadingAdmin></LoadingAdmin>}
                    {!loadingShare && dataSharePost && (
                      <div className="relative min-h-[40%] p-2 border-2 border-slate-400 rounded-lg">
                        {dataSharePost.post_data_two &&
                        dataSharePost.share_post_id ? (
                          <div className="share_content px-3 mt-3 border-2 rounded-lg">
                            {dataSharePost.post_data_two?.file_data.length >
                            1 ? (
                              dataSharePost.post_data_two?.file_data.map(
                                (item) => (
                                  <div className="col-span-6">
                                    <img
                                      className="w-full"
                                      src={item?.link}
                                      alt=""
                                    />
                                  </div>
                                )
                              )
                            ) : (
                              <div className="col-span-12">
                                <img
                                  className="w-full"
                                  src={
                                    dataSharePost.post_data_two?.file_data[0]
                                      ?.link
                                  }
                                  alt=""
                                />
                              </div>
                            )}
                            <div className="flex  gap-3 my-2">
                              <span className="w-[45px]">
                                <img
                                  className="w-full rounded-full"
                                  src={
                                    dataSharePost.post_data_two.user_data.avatar
                                      ? dataSharePost.post_data_two.user_data
                                          .avatar
                                      : "./undraw_profile.svg"
                                  }
                                  alt=""
                                />
                              </span>
                              <p className="font-bold text-black flex flex-col">
                                <span>
                                  {dataSharePost.post_data_two.user_data
                                    .firstName +
                                    " " +
                                    dataSharePost.post_data_two.user_data
                                      .lastName}
                                </span>
                                <span className="text-gray-600 m-0">
                                  {caculateTime(
                                    parseFloat(
                                      Math.floor(
                                        new Date() -
                                          new Date(
                                            dataSharePost.post_data_two.createdAt
                                          )
                                      ) /
                                        1000 /
                                        60 /
                                        60
                                    ).toFixed(2)
                                  )}
                                </span>
                              </p>
                            </div>
                            <div className="text-black fonr-bold ">
                              {dataSharePost.post_data_two?.content}
                            </div>
                          </div>
                        ) : !dataSharePost.post_data_two &&
                          dataSharePost.share_post_id ? (
                          <div className="mt-3 border rounded-xl mx-3 p-3 bg-gray-400">
                            <p className="text-bold text-black font-semibold">
                              Bài viết này đã bị xóa hoặc không tồn tại
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className="grid grid-cols-12 gap-2">
                              {dataSharePost?.file_data.length > 1 ? (
                                dataSharePost?.file_data.map((item) => (
                                  <div className="col-span-6">
                                    <img
                                      className="w-full"
                                      src={item?.link}
                                      alt=""
                                    />
                                  </div>
                                ))
                              ) : (
                                <div className="col-span-12">
                                  <img
                                    className="w-full"
                                    src={dataSharePost?.file_data[0]?.link}
                                    alt=""
                                  />
                                </div>
                              )}
                            </div>
                            <div className="share_content px-3 mt-3">
                              <div className="flex  gap-3">
                                <span className="w-[45px]">
                                  <img
                                    className="w-full rounded-full"
                                    src={
                                      dataSharePost.user_data.avatar
                                        ? dataSharePost.user_data.avatar
                                        : "./undraw_profile.svg"
                                    }
                                    alt=""
                                  />
                                </span>
                                <p className="font-bold text-black flex flex-col">
                                  <span>
                                    {dataSharePost.user_data.firstName +
                                      " " +
                                      dataSharePost.user_data.lastName}
                                  </span>
                                  <span className="text-gray-600 m-0">
                                    {caculateTime(
                                      parseFloat(
                                        Math.floor(
                                          new Date() -
                                            new Date(dataSharePost.createdAt)
                                        ) /
                                          1000 /
                                          60 /
                                          60
                                      ).toFixed(2)
                                    )}
                                  </span>
                                </p>
                              </div>
                              <div className="text-black fonr-bold ">
                                {dataSharePost?.content}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="w-full h-[10%]  flex items-center justify-center">
                    {loading && (
                      <button
                        disabled
                        className="cursor-not-allowed w-full text-center mt-3 bg-blue-500 py-1 rounded-lg text-slate-50 text-lg font-bold"
                        type="submit"
                      >
                        <LoadingAdmin></LoadingAdmin>
                      </button>
                    )}
                    {!loading && (
                      <button
                        className="w-full bg-blue-500 py-1 rounded-lg text-slate-50 text-lg font-bold"
                        type="submit"
                      >
                        Đăng
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex px-3 justify-between">
        <div className="flex gap-3">
          <span className="w-[45px]">
            <img
              className="w-full rounded-full"
              src={
                item.user_data.avatar
                  ? item.user_data.avatar
                  : "./undraw_profile.svg"
              }
              alt=""
            />
          </span>
          <p className="font-bold text-black flex flex-col">
            <span>
              {item.user_data.firstName + " " + item.user_data.lastName}
            </span>
            <span className="text-gray-600 m-0">
              {caculateTime(
                parseFloat(
                  Math.floor(new Date() - new Date(item.createdAt)) /
                    1000 /
                    60 /
                    60
                ).toFixed(2)
              )}
            </span>
          </p>
        </div>
        <div className="m-0 block relative text-2xl leading-none   font-bold ">
          <span
            onClick={() => {
              console.log(item.id);
              setOptionPost((old) => !old);
              // deletePost(item.id);
            }}
            className="cursor-pointer p-1 h-[30px] w-[30px] inline-block rounded-full hover:bg-gray-300 transition-all"
          >
            <i class="fa-solid fa-ellipsis"></i>
          </span>
          {optionPost && (
            <div className="absolute text-lg right-0 xl:w-[30vw] w-[50vw]  p-3 shadow_noti bg-white rounded-lg">
              {user?.id === item.user_id && (
                <>
                  <p
                    onClick={() => deletePost(item.id)}
                    className="p-2 m-0 cursor-pointer rounded-lg hover:bg-gray-300 flex gap-3"
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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </span>
                    <span>Xóa bài viết</span>
                  </p>
                  <p
                    onClick={() => handleEditPost(item.id)}
                    className="p-2 m-0 cursor-pointer rounded-lg hover:bg-gray-300 flex gap-3"
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
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </span>
                    <span>Chỉnh sửa bài viết</span>
                  </p>
                </>
              )}
              {user?.id != item.user_id && (
                <div
                  onClick={fetchOptions}
                  className="p-2 rounded-lg hover:bg-gray-300 flex gap-3 items-center cursor-pointer"
                >
                  <span>
                    <i class="fa-regular fa-flag  text-2xl inline-block"></i>
                  </span>
                  <span>Báo cáo bài viết</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <p className="px-3 text-black">{item.content}</p>
      {item.post_data_two && item.share_post_id ? (
        <div className="mt-3 border rounded-xl mx-3 p-3">
          <div className="grid grid-cols-12 gap-2">
            {item.post_data_two?.file_data.length > 1 ? (
              item.post_data_two?.file_data.map((item) => (
                <div className="col-span-6">
                  <img className="w-full" src={item?.link} alt="" />
                </div>
              ))
            ) : (
              <div className="col-span-12">
                <img
                  className="w-full"
                  src={item.post_data_two?.file_data[0]?.link}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="share_content px-3 mt-3">
            <div className="flex  gap-3">
              <span className="w-[45px]">
                <img
                  className="w-full rounded-full"
                  src={
                    item.post_data_two.user_data.avatar
                      ? item.post_data_two.user_data.avatar
                      : "./undraw_profile.svg"
                  }
                  alt=""
                />
              </span>
              <p className="font-bold text-black flex flex-col">
                <span>
                  {item.post_data_two.user_data.firstName +
                    " " +
                    item.post_data_two.user_data.lastName}
                </span>
                <span className="text-gray-600 m-0">
                  {caculateTime(
                    parseFloat(
                      Math.floor(
                        new Date() - new Date(item.post_data_two.createdAt)
                      ) /
                        1000 /
                        60 /
                        60
                    ).toFixed(2)
                  )}
                </span>
              </p>
            </div>
            <div className="text-black fonr-bold ">
              {item.post_data_two.content}
            </div>
          </div>
        </div>
      ) : !item.post_data_two && item.share_post_id ? (
        <div className="mt-3 border rounded-xl mx-3 p-3 bg-gray-400">
          <p className="text-bold text-black font-semibold">
            Bài viết này đã bị xóa hoặc không tồn tại
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-2">
          {item?.file_data &&
            item?.file_data.length > 0 &&
            item.file_data?.map((i) => {
              if (i.link) {
                if (item.file_data.length < 2) {
                  return (
                    <div key={i.id} className="col-span-12">
                      {i.link?.includes("video") ? (
                        <video
                          className="w-full object-cover h-[300px]"
                          src={i.link}
                          controls
                        ></video>
                      ) : (
                        <img
                          src={i.link}
                          className="w-full object-cover h-[300px]"
                          alt=""
                        />
                      )}
                    </div>
                  );
                } else {
                  return (
                    <div key={i.id} className="col-span-6">
                      {i.link.includes("video") ? (
                        <video
                          className="w-full object-cover h-[300px]"
                          src={i.link}
                          controls
                        ></video>
                      ) : (
                        <img
                          src={i.link}
                          className="w-full object-cover h-[300px]"
                          alt=""
                        />
                      )}
                    </div>
                  );
                }
              }
            })}
        </div>
      )}
      <div className="border-b-2 p-2 info_post flex justify-between px-3">
        {item.like_count > 0 && (
          <div className="flex user_like gap-1 items-center hover:underline cursor-pointer relative">
            <span>
              <img src="./heart_full.png" className="w-[25px]" alt="" />
            </span>
            <span className="font-bold">{item.like_count} Tym</span>
            <div className="absolute hidden transition-all user_like_data top-full z-10 w-[150px] text-white rounded-xl bg-[rgba(0,0,0,0.8)] px-3 py-2">
              {item.like_data.slice(0, 10).map((like) => (
                <p key={like.id + uuidv4()} className="m-0 text-start">
                  {like?.user_data?.firstName + " " + like?.user_data?.lastName}
                </p>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-3">
          {item.comment_count > 0 && (
            <div className="flex user_comment gap-1 items-center relative">
              <span
                onClick={() => {
                  setShowFormComment((showFormComment) => !showFormComment);
                }}
                className="font-bold hover:underline cursor-pointer"
              >
                {item.comment_count} Bình luận
              </span>
              {() => {}}
              <div className="absolute hidden transition-all right-0 user_comment_data top-full z-10 w-[150px] text-white rounded-xl bg-[rgba(0,0,0,0.8)] px-3 py-2">
                {renderUserComment(item.comment_data).map((comment) => (
                  <p key={comment.id + uuidv4()} className="m-0 text-start">
                    {comment?.user_data?.firstName +
                      " " +
                      comment?.user_data?.lastName}
                  </p>
                ))}
              </div>
            </div>
          )}
          {item.share_count > 0 && (
            <div className="flex gap-1 user_share items-center relative">
              <span
                onClick={() => {
                  setShowFormComment((showFormComment) => !showFormComment);
                }}
                className="font-bold hover:underline cursor-pointer"
              >
                {item.share_count} Chia sẻ
              </span>
              <div className="absolute hidden transition-all right-0 user_share_data top-full z-10 w-[150px] text-white rounded-xl bg-[rgba(0,0,0,0.8)] px-3 py-2">
                {item.user_share.slice(0, 10).map((like) => (
                  <p key={like.id + uuidv4()} className="m-0 text-start">
                    {like?.user_data?.firstName +
                      " " +
                      like?.user_data?.lastName}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center px-3 pb-3">
        <div
          onClick={() =>
            createLikePostHome(
              item.id,
              item.user_id,
              item.like_data.some((item) => item.user_id === user?.id)
            )
          }
          className="like flex items-center gap-2 xl:px-5 px-1 lg:px-2 mt-3 py-1 rounded-lg transition-all cursor-pointer  hover:bg-gray-300 "
        >
          <span>
            {item.like_data.length > 0 &&
            item.like_data.some((item) => item.user_id === user?.id) ? (
              <img
                key={item.id}
                src="./heart_full.png"
                className="w-[20px]"
                alt=""
              />
            ) : (
              <img
                key={item.id}
                src="./heart.png"
                className="w-[20px]"
                alt=""
              />
            )}
          </span>
          <span className="font-bold text-gray-600">Tym</span>
        </div>
        <div
          onClick={() => {
            setShowFormComment((showFormComment) => !showFormComment);
          }}
          className="like flex items-center gap-2 xl:px-5 px-1 lg:px-2 mt-3 py-1 rounded-lg transition-all cursor-pointer  hover:bg-gray-300 "
        >
          <span>
            <img src="./comment.png" className="w-[20px]" alt="" />
          </span>
          <span className="font-bold text-gray-600">Bình luận</span>
        </div>
        <div
          onClick={() => createPostShare(item.id)}
          className="like flex items-center gap-2 xl:px-5 px-1 lg:px-2 mt-3 py-1 rounded-lg transition-all cursor-pointer  hover:bg-gray-300 "
        >
          <span>
            <img src="./share.png" className="w-[20px]" alt="" />
          </span>
          <span className="font-bold text-gray-600">Chia sẻ</span>
        </div>
      </div>
      {showFormComment && (
        <div className="h-auto mx-3 border-t-2 py-2 ">
          <form onSubmit={handleComment} action="">
            <div className="flex gap-3 items-center">
              <span className=" relative md:w-[5%] lg:w-[5%] w-[10%]">
                <img
                  className="w-full max-w-[40px] rounded-full"
                  src={user?.avatar ? user?.avatar : "./undraw_profile.svg"}
                  alt=""
                />
                <span className="absolute w-[10px] h-[10px] rounded-full bg-green-600 right-0 bottom-0 border border-[10px] border-white"></span>
              </span>
              <div className="relative xl:w-[95%] w-[90%]">
                <input
                  ref={inputComment}
                  type="text"
                  onChange={lodash.debounce((e) => {
                    setContent(e.target.value);
                  }, 200)}
                  placeholder="Viết bình luận"
                  className="w-full rounded-full py-2 text-black pl-3 pr-5 outline-none bg-gray-200"
                />
                {showEmoji && (
                  <div className="fixed  z-[100] top-1/2 right-[10%] -translate-y-1/2">
                    <Picker
                      pickerStyle={{ width: "100%" }}
                      onEmojiClick={onEmojiClick}
                    ></Picker>
                  </div>
                )}
                <span className="p-1 absolute xl:right-[7%] right-[12%] top-1/2 cursor-pointer hover:bg-gray-300 rounded-full -translate-y-1/2 transition-all">
                  <img
                    onClick={() => setShowEmoji((showEmoji) => !showEmoji)}
                    src="./smile.png"
                    className="w-[20px] "
                    alt=""
                  />
                </span>
                <label
                  htmlFor="file_comment"
                  className="p-1 absolute right-[2%] top-1/2 cursor-pointer hover:bg-gray-300 rounded-full -translate-y-1/2 transition-all"
                >
                  <img src="./camera.png" className="w-[20px] " alt="" />
                  <input
                    onChange={(e) => showImage(e)}
                    id="file_comment"
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </form>
          <div className="max-w-full">
            {loadingComment && <LoadingAdmin></LoadingAdmin>}

            {file && (
              <p
                onClick={(e) => {
                  setFile("");
                  // showImg.current.src = "";
                  e.target.parentElement.nextElementSibling.querySelector(
                    "img"
                  ).src = "";
                }}
                className=" cursor-pointer text-end m-0 w-full leading-none "
              >
                <span className="w-[30px] h-[30px]  text-xl  bg-gray-300 p-2  rounded-full mt-3 flex items-center justify-center hover:scale-110">
                  x
                </span>
              </p>
            )}

            <p className="m-0">
              <img ref={showImg} src="" alt="" />
            </p>
          </div>

          <div className="mx-3 py-2 max-w-full">
            {item?.comment_data.length > 0 &&
              item?.comment_data.slice(0, showComment).map((comment) => {
                console.log(comment);
                if (comment.parent_id == 0) {
                  return (
                    <>
                      <CommentPost
                        key={comment.id}
                        user={user}
                        // setShowReply={setShowReply}
                        item={item}
                        comment={comment}
                      ></CommentPost>
                      <RenderComment
                        key={comment.id + comment.createdAt + uuidv4()}
                        listComment={item.comment_data}
                        id_parent={comment.id}
                        id_post={item.id}
                        rank={1}
                        user={user}
                        handleLikeComment={handleLikeComment}
                      ></RenderComment>
                    </>
                  );
                }
              })}
            {item?.comment_data.length > showComment && showComment > 0 && (
              <p
                onClick={() =>
                  setShowComment((showComment) => {
                    let showCommentCurent = showComment + 4;

                    return showCommentCurent;
                  })
                }
                className="font-bold m-0 cursor-pointer hover:underline"
              >
                Xem thêm bình luận
              </p>
            )}
            {(showComment < 0 || showComment > item?.comment_data.length) &&
              item?.comment_data.length > 0 && (
                <p
                  onClick={() => setShowComment(1)}
                  className="font-bold m-0 cursor-pointer hover:underline"
                >
                  Ẩn bớt bình luận
                </p>
              )}
            {item?.comment_data.length <= 0 && <div>Chưa có bình luận</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostHome;
