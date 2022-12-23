import React, { useRef, useState } from "react";
import Picker from "emoji-picker-react";
import LoadingAdmin from "./LoadingAdmin";
import lodash from "lodash";
import { CaculateTime } from "../trait/CaculateTime";
import { v4 as uuidv4 } from "uuid";

const FormReply = ({ user, handleComment, comment, handleLikeComment }) => {
  //reply
  const [showEmojiReply, setShowEmojiReply] = useState(false);
  const [contentReply, setContentReply] = useState("");
  const inputCommentreply = useRef();
  const onEmojiClickReply = (event, emojiObject) => {
    console.log(event);
    inputCommentreply.current.value = contentReply + " " + event.emoji;
    setContentReply((pre) => pre + " " + event.emoji);
    setShowEmojiReply(false);
  };
  //end reply
  return (
    <>
      <div className=" ml-[6%]">
        <form action="">
          <div className="flex gap-3 items-center">
            <span className=" relative md:w-[5%] lg:w-[5%] w-[10%]">
              <img
                className="w-full max-w-[40px] rounded-full"
                src={user?.avatar ? user?.avatar : "./undraw_profile.svg"}
                alt=""
              />
              <span className="absolute w-[10px] h-[10px] rounded-full bg-green-600 right-0 bottom-0 border  border-white"></span>
            </span>
            <div className="relative xl:w-[95%] w-[90%]">
              <input
                ref={inputCommentreply}
                type="text"
                onChange={lodash.debounce((e) => {
                  setContentReply(e.target.value);
                }, 200)}
                placeholder="Viết bình luận"
                className="w-full rounded-full py-2 text-black pl-3 pr-5 outline-none bg-gray-200"
              />
              {showEmojiReply && (
                <div className="fixed  z-[100] top-1/2 right-[10%] -translate-y-1/2">
                  <Picker
                    pickerStyle={{ width: "100%" }}
                    onEmojiClick={onEmojiClickReply}
                  ></Picker>
                </div>
              )}
              <span className="p-1 absolute xl:right-[7%] right-[12%] top-1/2 cursor-pointer hover:bg-gray-300 rounded-full -translate-y-1/2 transition-all">
                <img
                  onClick={() =>
                    setShowEmojiReply((showEmojireply) => !showEmojireply)
                  }
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
      </div>
    </>
  );
};

export default FormReply;
