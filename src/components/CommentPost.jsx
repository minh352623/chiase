import React, { useRef, useState } from "react";
import { CaculateTime } from "../trait/CaculateTime";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import RenderComment from "./RenderComment";
import Picker from "emoji-picker-react";
import lodash from "lodash";
import axios from "axios";
import LoadingAdmin from "./LoadingAdmin";

const CommentPost = ({
  comment,
  item,
  user,
  handleLikeComment,
  FetchPosts,
  socket,
}) => {
  const [showReply, setShowReply] = useState(false);
  const [loadingComment, setLoadingComment] = useState(false);
  const [content, setContent] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const inputComment = useRef();
  const navigate = useNavigate();
  const showImgRep = useRef();
  const [file, setFile] = useState("");
  const showImage = (e) => {
    // showImgRep.current.parentElement.parentElement.classList.remove("");
    const [file] = e.target.files;
    setFile(e.target.files);
    console.log(e.target.files[0]);
    if (file) {
      showImgRep.current.src = URL.createObjectURL(file);
    }
  };
  const onEmojiClick = (event, emojiObject) => {
    //console.log(event);
    inputComment.current.value = content + " " + event.emoji;
    setContent((pre) => pre + " " + event.emoji);
    setShowEmoji(false);
  };
  const createReply = async (e) => {
    e.preventDefault();
    setLoadingComment(true);

    try {
      const response = await axios({
        url: "/auth/comment/createReply",
        method: "POST",
        data: {
          post_id: item.id,
          user_id: user?.id,
          content: content.trim(),
          parent_id: comment?.id,
          recie: comment?.user_id,
          textReply:
            user?.firstName +
            " " +
            user?.lastName +
            " đã trả lời bình luân của bạn! Trong bài viết của " +
            item?.user_data?.firstName +
            " " +
            item?.user_data?.lastName,
          text:
            user?.firstName +
            " " +
            user?.lastName +
            " đã bình luận bài viết của bạn!",
          ownPost: item?.user_id,
          avatar: user?.avatar || "",
        },
      });

      if (response.status == 200) {
        if (user?.id != item?.user_id) {
          socket?.emit("commentPost", {
            commenter: user?.id,
            nameCommenter: user?.firstName + " " + user?.lastName,
            ownPost: item?.user_id,
            text: " đã bình luận bài viết của bạn!",
          });
        }
        if (user?.id != comment?.user_id) {
          socket?.emit("commentPost", {
            commenter: user?.id,
            nameCommenter: user?.firstName + " " + user?.lastName,
            ownPost: comment?.user_id,
            text:
              " đã trả lời bình luân của bạn! Trong bài viết của " +
              item?.user_data?.firstName +
              " " +
              item?.user_data?.lastName,
          });
        }
        setLoadingComment(false);

        setShowReply(false);
        FetchPosts();
      }
    } catch (e) {
      setLoadingComment(false);

      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  return (
    <>
      <div className="" key={comment.id + comment.createdAt + uuidv4()}>
        <div
          key={comment.id + comment.createdAt + comment.updatedAt + uuidv4()}
          className="my-2 lg:w-3/5 w-full lg:max-w-4/5 flex f gap-2"
        >
          <p className="lg:w-[10%] w-[15%]">
            <img
              className="w-full rounded-full object-cover"
              src={
                comment?.user_data?.avatar
                  ? comment?.user_data?.avatar
                  : "../undraw_profile.svg"
              }
              alt=""
            />
          </p>
          <div className="lg:w-[95%] w-[85%] ">
            {comment.text && (
              <div className="relative m-0 px-2 py-1 bg-gray-300 rounded-lg text-black">
                <Link
                  to={`/profile/${comment.user_id}`}
                  className="block text-black font-semibold my-1"
                >
                  {comment?.user_data.firstName +
                    " " +
                    comment?.user_data.lastName}
                </Link>
                <span>{comment.text}</span>
                {comment.like_count > 0 && (
                  <p className="absolute flex gap-1 m-0  right-0 bottom-[-8px] shadow-xl px-3 py-1 rounded-full bg-white">
                    <span>
                      <img
                        src="../like_color.png"
                        className="w-[20px]"
                        alt=""
                      />
                    </span>
                    <span>{comment.like_count}</span>
                  </p>
                )}
              </div>
            )}
            {comment.file && (
              <p className="w-[30%] m-0">
                <img
                  className="w-full object-cover "
                  src={comment.file}
                  alt=""
                />
              </p>
            )}
            <div className="flex gap-3">
              {comment?.like_comment_data.some(
                (item) => item.user_id === user?.id
              ) ? (
                <span
                  onClick={() =>
                    handleLikeComment(
                      comment.id,
                      comment.user_id,
                      comment?.like_comment_data.some(
                        (item) => item.user_id === user?.id
                      )
                    )
                  }
                  className={`font-bold cursor-pointer hover:underline-offset-auto text-blue-400`}
                >
                  Thích
                </span>
              ) : (
                <span
                  onClick={() =>
                    handleLikeComment(
                      comment.id,
                      comment.user_id,
                      comment?.like_comment_data.some(
                        (item) => item.user_id === user?.id
                      )
                    )
                  }
                  className={`font-bold cursor-pointer hover:underline-offset-auto hover:text-blue-400 `}
                >
                  Thích
                </span>
              )}
              <span
                onClick={() => setShowReply((showReply) => !showReply)}
                className={`font-bold cursor-pointer hover:underline hover:text-blue-400 `}
              >
                Phản hồi
              </span>
              <span className="font-semibold cursor-pointer">
                {CaculateTime(comment.createdAt)}
              </span>
            </div>
          </div>
        </div>
        {showReply && (
          <div className="h-auto mx-3  py-2 ">
            <form action="" onSubmit={createReply}>
              <div className="flex gap-3 items-center">
                <span className=" relative md:w-[5%] lg:w-[5%] w-[10%]">
                  <img
                    className="w-full max-w-[40px] rounded-full"
                    src={
                      user?.avatar
                        ? user?.avatar
                        : "http://localhost:5173/undraw_profile.svg"
                    }
                    alt=""
                  />
                  <span className="absolute w-[10px] h-[10px] rounded-full bg-green-600 right-0 bottom-0 border border-[10px] border-white"></span>
                </span>
                <div className="relative lg:w-[95%] w-[90%]">
                  <input
                    ref={inputComment}
                    type="text"
                    onChange={lodash.debounce((e) => {
                      setContent(e.target.value);
                      inputComment.current?.focus();
                    }, 1000)}
                    defaultValue={content}
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
                  <span className="p-1 absolute lg:right-[2%] right-[5%] top-1/2 cursor-pointer hover:bg-gray-300 rounded-full -translate-y-1/2 transition-all">
                    <img
                      onClick={() => setShowEmoji((showEmoji) => !showEmoji)}
                      src="http://localhost:5173/smile.png"
                      className="w-[20px] "
                      alt=""
                    />
                  </span>
                </div>
              </div>
            </form>
          </div>
        )}
        {loadingComment && <LoadingAdmin></LoadingAdmin>}
      </div>
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
};

export default CommentPost;
