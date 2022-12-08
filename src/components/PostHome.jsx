import React from "react";

const PostHome = ({ item }) => {
  const caculateTime = (time) => {
    let message = "abc";
    console.log(time);
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
  return (
    <div className="shadow_main py-3 bg-white my-3 rounded-xl">
      <div className="flex px-3 gap-3">
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
      <p className="px-3 text-black">{item.content}</p>
      <div className="grid grid-cols-12 gap-2">
        {item?.file_data &&
          item.file_data.map((i) => {
            if (item.file_data.length < 2) {
              return (
                <div key={i.id} className="col-span-12">
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
          })}
      </div>
      <div className="border-b-2 p-2 info_post flex justify-between px-2"></div>
      <div className="flex justify-between items-center px-3">
        <div className="like flex gap-2 px-5 mt-3 py-1 rounded-lg transition-all cursor-pointer  hover:bg-gray-300 ">
          <span>
            <img src="./like.png" className="w-[20px]" alt="" />
          </span>
          <span className="font-bold text-gray-600">Thích</span>
        </div>
        <div className="like flex gap-2 px-5 mt-3 py-1 rounded-lg transition-all cursor-pointer  hover:bg-gray-300 ">
          <span>
            <img src="./comment.png" className="w-[20px]" alt="" />
          </span>
          <span className="font-bold text-gray-600">Bình luận</span>
        </div>
        <div className="like flex gap-2 px-5 mt-3 py-1 rounded-lg transition-all cursor-pointer  hover:bg-gray-300 ">
          <span>
            <img src="./share.png" className="w-[20px]" alt="" />
          </span>
          <span className="font-bold text-gray-600">Chia sẻ</span>
        </div>
      </div>
    </div>
  );
};

export default PostHome;
