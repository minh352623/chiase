import React, { useRef, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingAdmin from "./LoadingAdmin";
import { setUpLoadPost } from "../store/reducers/authReducer";
import { useDispatch } from "react-redux";
import Picker from "emoji-picker-react";
const schema = yup.object({});
const Status = ({ user }) => {
  const [isShowStatus, setIsShowStatus] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const [content, setContent] = useState("");
  const [fileUpload, setFileUpload] = useState("");
  const [subImage, setSubImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createStatus = async (e) => {
    e.preventDefault();
    console.log(content);
    console.log(fileUpload);
    console.log(subImage);
    // return;
    let formData = new FormData();
    formData.append("content", content);
    formData.append("user_id", user?.id);

    if (fileUpload.length > 0) {
      fileUpload.forEach((item, index) => {
        console.log(item);
        formData.append(`urls`, item);
      });
    }
    if (subImage.length > 0) {
      subImage.forEach((item) => {
        formData.append("sub_file", item);
      });
    }
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
        console.log(response);
        setContent("");
        setIsShowStatus(false);
        dispatch(setUpLoadPost());
        setFileUpload("");
        setSubImage("");
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
  const showImg = useRef();
  const myWidget = cloudinary.createUploadWidget(
    {
      cloudName: "dmeyrzzjp",
      uploadPreset: "ml_default",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        setFileUpload((fileUpload) => [...fileUpload, result.info.url]);
      }
    }
  );

  const [isShowEdit, setIsShowEdit] = useState(false);
  const handleSubImage = (e) => {
    e.preventDefault();
    let subImages = e.target.querySelectorAll("textarea");
    let arr = [];
    [...subImages].forEach((item) => {
      arr.push(item.value);
    });
    console.log(arr[0]);
    setSubImage(arr);
    setIsShowEdit(false);
  };
  const showImage = () => {
    if ([...fileUpload]) {
      showImg.current.innerHTML = "";
      [...fileUpload].forEach((file) => {
        if (file.includes("video")) {
          let video = document.createElement("video");

          video.controls = true;
          video.muted = false;
          video.className = "w-full";
          video.src = file;
          let span = document.createElement("span");
          span.textContent = "x";
          span.className =
            "p-2 rounded-full bg-gray-300 flex items-center justify-center text-xl block cursor-pointer";

          let p = document.createElement("p");
          if ([...fileUpload].length >= 2) {
            p.className = "col-span-6";
          } else {
            p.className = "col-span-12";
          }
          span.onclick = function () {
            setFileUpload((old) => fileUpload.filter((item) => item != file));
            p.remove();
          };
          p.appendChild(video);
          p.appendChild(span);
          showImg.current.insertAdjacentElement("beforeend", p);
        } else {
          let span = document.createElement("span");
          span.textContent = "x";
          span.className =
            "p-2 rounded-full bg-gray-300 flex items-center justify-center text-xl block  cursor-pointer";

          let img = document.createElement("img");
          let p = document.createElement("p");
          if ([...fileUpload].length >= 2) {
            p.className = "col-span-6";
          } else {
            p.className = "col-span-12";
          }
          span.onclick = function () {
            console.log(fileUpload.filter((item) => item != file));
            setFileUpload((old) => fileUpload.filter((item) => item != file));
            p.remove();
          };
          p.appendChild(img);
          p.appendChild(span);

          img.className = "w-full";
          img.src = file;
          showImg.current.insertAdjacentElement("beforeend", p);
        }
      });
    }
  };
  useEffect(() => {
    if (fileUpload.length > 0) {
      showImage();
    }
  }, [fileUpload]);

  const [showEmoji, setShowEmoji] = useState(false);
  const textarea = useRef();
  const onEmojiClick = (event, emojiObject) => {
    console.log(event);
    textarea.current.value = content + " " + event.emoji;
    setContent((pre) => pre + " " + event.emoji);
    setShowEmoji(false);
  };
  console.log(content);
  return (
    <div className="shadow_main xl:h-[21vh] h-[23vh] bg-white rounded-xl p-3">
      {isShowEdit && (
        <div className="popup fixed z-[11] inset-0 bg-[rgba(255,255,255,0.5)] transition-all m-auto flex">
          <div className="py-2 px-3 bg-white shadow_main xl:w-[40vw] w-[90vw] h-[80vh] m-auto">
            <div className="h-[10%] flex justify-between py-3 border-b-2">
              <span></span>
              <span className="text-2xl text-black font-bold">Ảnh/video</span>
              <span
                onClick={() => {
                  setIsShowEdit(false);
                }}
                className="text-2xl w-[35px] h-[35px] cursor-pointer hover:bg-gray-500 transition-all hover:scale-110 flex items-center justify-center rounded-full bg-gray-400"
              >
                x
              </span>
            </div>
            <div className="h-[90%] overflow-y-auto py-2">
              <form onSubmit={handleSubImage} action="" className="h-full">
                <div className="w-full h-[90%] overflow-y-auto">
                  {fileUpload &&
                    fileUpload.map((item, index) => {
                      let src = item;
                      if (item.includes("video")) {
                        return (
                          <div className="flex flex-col my-3">
                            <span className="rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full flex justify-center items-center">
                              <video
                                controls
                                className="w-1/2 h-2/3 object-cover"
                                src={src}
                                alt=""
                              />
                            </span>
                            <textarea
                              name={`content_file_${index + 1}`}
                              id=""
                              placeholder="Chú thích"
                              className="w-full text-black p-3 rounded-xl outline-none border-2 resize-none mt-2"
                            >
                              {subImage[index] ? subImage[index] : ""}
                            </textarea>
                          </div>
                        );
                      } else {
                        return (
                          <div className="flex flex-col my-3">
                            <span className="rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full flex justify-center items-center">
                              <img
                                className="w-1/2 h-2/3 object-cover"
                                src={src}
                                alt=""
                              />
                            </span>
                            <textarea
                              name={`content_file_${index + 1}`}
                              id=""
                              placeholder="Chú thích"
                              className="w-full text-black p-3 rounded-xl outline-none border-2 resize-none mt-2"
                            >
                              {subImage[index] ? subImage[index] : ""}
                            </textarea>
                          </div>
                        );
                      }
                    })}
                </div>
                <div className="w-full h-[10%]  flex items-center justify-center">
                  <button
                    className="w-full bg-blue-500 py-1 rounded-lg text-slate-50 text-lg font-bold"
                    type="submit"
                  >
                    Xong
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {isShowStatus && (
        <div className="popup fixed z-[10] inset-0 bg-[rgba(255,255,255,0.5)] transition-all m-auto flex">
          <div className="py-2 px-3 bg-white shadow_main xl:w-[40vw] w-[90vw] h-[80vh] m-auto">
            <div className="h-[10%] flex justify-between py-3 border-b-2">
              <span></span>
              <span className="text-2xl text-black font-bold">
                Tạo bài viết
              </span>
              <span
                onClick={() => {
                  setIsShowStatus(false);
                  setFileUpload("");
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
                      src={user?.avatar ? user.avatar : "../undraw_profile.svg"}
                      alt=""
                    />
                  </span>
                  <div>
                    <p className="font-bold m-0 text-black">
                      {user.firstName + " " + user.lastName}
                    </p>
                    <p className="m-0 font-semibold text-black px-2 flex gap-1 bg-gray-300 rounded-full text-center justify-center items-center">
                      <span>
                        <img
                          className="w-[15px]"
                          src="../planet-earth.png"
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
                      onChange={(e) => setContent(e.target.value)}
                      className="p-3 outline-none w-full resize-none h-[30%] text-black"
                      placeholder="Bạn đang nghĩ gì thế?"
                    ></textarea>
                    <div className="flex justify-between">
                      <span></span>
                      <div className="my-1 p-2 relative hover:bg-gray-300 rounded-full w-fit cursor-pointer">
                        {showEmoji && (
                          <div className="fixed  z-[100] top-1/2 right-[10%] -translate-y-1/2">
                            <Picker
                              pickerStyle={{ width: "100%" }}
                              onEmojiClick={onEmojiClick}
                            ></Picker>
                          </div>
                        )}
                        <img
                          onClick={() =>
                            setShowEmoji((showEmoji) => !showEmoji)
                          }
                          src="../smile.png"
                          className="w-[40px]"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="relative min-h-[40%] p-2 border-2 border-slate-400 rounded-lg">
                      <div
                        ref={showImg}
                        className="grid grid-cols-12 gap-2"
                      ></div>
                      {fileUpload && (
                        <div className="flex gap-3">
                          <label
                            onClick={() => {
                              myWidget.open();
                            }}
                            className="absolute cursor-pointer hover:scale-105 shadow_noti transition-all w-[150px] text-center text-black bg-white p-2 rounded-full top-[12px] left-[12px]"
                            htmlFor="file_status"
                          >
                            Thêm ảnh/ Video
                          </label>
                          <p
                            onClick={() => setIsShowEdit(true)}
                            className="absolute cursor-pointer hover:scale-105 shadow_noti transition-all w-[150px] text-center text-black bg-white p-2 rounded-full top-[12px] left-[170px]"
                          >
                            Chỉnh sửa
                          </p>
                        </div>
                      )}
                      <label
                        // htmlFor="file_status"
                        className="w-full flex cursor-pointer items-center justify-center h-full bg-gray-300 m-0"
                      >
                        {!fileUpload && (
                          <div
                            onClick={() => {
                              myWidget.open();
                            }}
                            className="flex justify-center items-center flex-col p-5"
                          >
                            <span>
                              <img
                                className="w-[100px]"
                                src="../image.png"
                                alt=""
                              />
                            </span>
                            <span className="text-black font-semibold">
                              Thêm ảnh/video
                            </span>
                          </div>
                        )}
                      </label>
                    </div>
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
                    {(content || fileUpload) && !loading && (
                      <button
                        className="w-full bg-blue-500 py-1 rounded-lg text-slate-50 text-lg font-bold"
                        type="submit"
                      >
                        Đăng
                      </button>
                    )}
                    {!content && !fileUpload && !loading && (
                      <button
                        disabled
                        className="cursor-not-allowed w-full text-center mt-3 bg-gray-500 py-1 rounded-lg text-slate-50 text-lg font-bold"
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
      <div className="flex gap-3 border-b-2">
        <span className="inline-block w-[50px]">
          <img
            className="w-full rounded-full"
            src={user?.avatar ? user.avatar : "./undraw_profile.svg"}
            alt=""
          />
        </span>
        <p
          onClick={() => {
            setIsShowStatus(true);
            setFileUpload("");
          }}
          className="px-3 xl:text-lg text-sm py-3 css_dot  bg-blue-100 rounded-full hover:bg-gray-300 flex-1 cursor-pointer transition-all "
        >
          {user.lastName} ơi, Bạn đang nghĩ gì thế
        </p>
      </div>
      <div className="flex justify-between xl:px-5 items-center  py-2">
        <p className="flex gap-3 m-0 items-center hover:bg-gray-300 px-2 py-1 cursor-pointer rounded-lg">
          <span className="w-[40px]">
            <img src="../video-player.png" alt="" />
          </span>
          <span className="xl:text-sl text-sm font-bold">Video trực tiếp</span>
        </p>
        <p
          onClick={() => setIsShowStatus(true)}
          className="flex gap-3 m-0 items-center hover:bg-gray-300 px-2 py-1 cursor-pointer rounded-lg"
        >
          <span className="w-[40px]">
            <img src="../gallery.png" alt="" />
          </span>
          <span className="xl:text-sl text-sm font-bold">Ảnh/Video</span>
        </p>
        <p className="hidden xl:flex gap-3 m-0 items-center hover:bg-gray-300 px-2 py-1 cursor-pointer rounded-lg">
          <span className="w-[40px]">
            <img src="../laughing.png" alt="" />
          </span>
          <span className="xl:text-sl text-sm font-bold">Feeling/Activity</span>
        </p>
      </div>
    </div>
  );
};

export default Status;
