import React from "react";
import moment from "moment-timezone";

const Message = ({ item, current, own, friend }) => {
  if (current) {
    return (
      <div className=" w-full text-end ">
        <div className=" w-full relative text-end flex gap-1 justify-end">
          <div
            className={`w-fit max-w-[70%] group relative my-1 max-w-1/2 bg-blue-400 rounded-2xl text-white px-4 py-2`}
          >
            <p className="max-w-full m-0  text-start cursor-pointer h-auto max-h-[300px]">
              {item.text}
            </p>
            <span className="createdAt_mess  right-full w-[200px] transition-all bg-[rgba(0,0,0,0.7)] px-2 py-1 text-center rounded-full text-white absolute top-1/2 -translate-y-1/2 ">
              {moment(item.createdAt)
                .tz("Asia/Bangkok")
                .format("DD/MM/YYYY h:mm A")}
            </span>
          </div>

          <span className="leading-none p-2">
            <img
              src={own?.avatar ? own?.avatar : "./undraw_profile.svg"}
              className="w-[30px] rounded-full"
              alt=""
            />
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full text-start">
      <div className=" w-full text-start  flex gap-1">
        <span className="leading-none p-2">
          <img
            src={friend.avatar ? friend.avatar : "./undraw_profile.svg"}
            className="w-[30px] rounded-full"
            alt=""
          />
        </span>
        <div className="group relative max-w-[70%] my-1 ">
          <p
            className={`w-fit m-0 h-auto max-h-[300px] max-w-1/2 bg-gray-400  block rounded-2xl text-black px-4 py-2`}
          >
            {item.text}
          </p>
          <span className="createdAt_mess text-center  left-full w-[200px] transition-all bg-[rgba(0,0,0,0.7)] px-2 py-1 rounded-full text-white absolute top-1/2 -translate-y-1/2 ">
            {moment(item.createdAt)
              .tz("Asia/Bangkok")
              .format("DD/MM/YYYY h:mm A")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Message;
