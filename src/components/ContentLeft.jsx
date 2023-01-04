import React from "react";
import { Link } from "react-router-dom";
import { CaculateTime } from "../trait/CaculateTime";

const ContentLeft = ({ user, nofitycations }) => {
  console.log(nofitycations.notys);
  return (
    <div>
      {/* <div
            key={noti.id}
            className="p-2 hover:bg-gray-300 transition-all rounded-lg flex notis-center gap-3"
          >
            <span className=" block w-[20%] xl:w-[10%]">
              <img
                className="w-full  rounded-full"
                src={
                  noti?.user_data?.avatar
                    ? noti?.user_data?.avatar
                    : "./undraw_profile.svg"
                }
                alt=""
              />
            </span>
            <div className="flex flex-col gap-1   w-[80%]">
              <p className="m-0 css_dot  text-sm font-semibold text-black">
                {noti.text}
              </p>
              <span className="text-sm text-start text-blue-400 font-semibold">
                {CaculateTime(noti.createdAt)}
              </span>
            </div>
          </div>; */}
      <div className="flex flex-col">
        <Link
          to={`/profile/${user?.id}`}
          className="flex gap-3 no-underline items-center hover:bg-gray-300 px-2 py-3 rounded-lg cursor-pointer"
        >
          <span>
            <img
              className="w-[40px] rounded-full"
              src={user?.avatar ? user.avatar : "./undraw_profile.svg"}
              alt=""
            />
          </span>
          <span className="text-slate-900 font-bold">
            {user?.firstName + " " + user.lastName}
          </span>
        </Link>
        <Link
          to="/friends"
          className="flex gap-3 no-underline items-center hover:bg-gray-300 px-2 py-3 rounded-lg cursor-pointer"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-slate-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          </span>
          <span className="text-slate-900 font-bold">Bạn bè</span>
        </Link>
      </div>
      <div className="mt-3 shadow-sm p-3 rounded-2xl bg-white max-h-[50vh] h-[50vh] overflow-y-scroll content_center">
        <h5 className="text-black text-lg">Thông báo mới nhất</h5>
        {nofitycations.notys.map((noti) => {
          if (noti.read == 0)
            return (
              <div
                key={noti.id}
                className="p-2 my-1 texy-start hover:bg-gray-400 bg-gray-300 transition-all rounded-lg  flex items-center gap-3"
              >
                <span className="block w-[15%]">
                  <img
                    className="w-full block rounded-full"
                    src={noti?.avatar ? noti?.avatar : "./undraw_profile.svg"}
                    alt=""
                  />
                </span>
                <div className="flex flex-col gap-1 w-[90%]">
                  <span className="text-sm text-start font-semibold text-black">
                    {noti.text}
                  </span>
                  <div className="flex justify-between">
                    <span className="text-sm text-start text-blue-400 font-semibold">
                      {CaculateTime(noti.createdAt)}
                    </span>
                    <span className="p-2 inline-block w-[20px] h-[20px] text-end bg-blue-500 rounded-full"></span>
                  </div>
                </div>
              </div>
            );
          return (
            <div
              key={noti.id}
              className="p-2 my-1 hover:bg-gray-300 transition-all rounded-lg flex items-center gap-3"
            >
              <span className="block w-[15%]">
                <img
                  className="w-full rounded-full"
                  src={noti?.avatar ? noti?.avatar : "./undraw_profile.svg"}
                  alt=""
                />
              </span>
              <div className="flex flex-col gap-1 w-[90%] ">
                <span className="text-sm text-start font-semibold text-black">
                  {noti.text}
                </span>
                <span className="text-sm text-start text-blue-400 font-semibold">
                  {CaculateTime(noti.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
        {(nofitycations.length <= 0 || nofitycations?.noty_count <= 0) && (
          <div className="flex items-center justify-center">
            không có thông báo
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentLeft;
