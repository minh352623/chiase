import React from "react";
import moment from "moment-timezone";

const Message = ({ item, current }) => {
  if (current) {
    return (
      <div className=" w-full text-end ">
        <div className=" w-full text-end flex gap-1 justify-end">
          <p
            className={`w-fit my-1 max-w-1/2 bg-blue-400 rounded-full text-white px-4 py-2`}
          >
            <span>{item.text}</span>
          </p>

          <span className="leading-none p-2">
            <img
              src={
                item.user_data.avatar
                  ? item.user_data.avatar
                  : "./video-camera.svg"
              }
              className="w-[30px] rounded-full"
              alt=""
            />
          </span>
        </div>
        <span className="">
          {moment(item.createdAt)
            .tz("Asia/Bangkok")
            .format("DD/MM/YYYY h:mm:ss A")}
        </span>
      </div>
    );
  }
  return (
    <div className="w-full text-start">
      <div className=" w-full text-start  flex gap-1">
        <span className="leading-none p-2">
          <img
            src={
              item.user_data.avatar
                ? item.user_data.avatar
                : "./video-camera.svg"
            }
            className="w-[30px] rounded-full"
            alt=""
          />
        </span>
        <span
          className={`w-fit my-1 max-w-1/2 bg-gray-400 my-1 block rounded-full text-black px-4 py-2`}
        >
          {item.text}
        </span>
      </div>
      <span> {moment(item.createdAt).format("DD/MM/YYYY h:mm:ss A")}</span>
    </div>
  );
};

export default Message;
