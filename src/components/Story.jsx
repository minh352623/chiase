import React from "react";

const Story = ({ user }) => {
  return (
    <div className="story h-[28vh]  xl:h-[35vh] py-3 rounded-xl bg-slate-50 shadow_main">
      <div className="flex gap-3 items-center pl-3 overflow-y-hidden h-full w-full overflow-x-auto">
        <div className="rounded-lg cursor-pointer border-[1px] hover:bg-gray-300 transition-all h-full xl:w-1/5 w-1/3 ">
          <div className="rounded-lg relative h-3/4 w-full ">
            <img
              className="h-full rounded-t-lg  object-cover"
              src={user?.avatar ? user.avatar : "./undraw_profile.svg"}
              alt=""
            />
            <div className="absolute text-slate-50 flex font-bold items-center  border-4 border-white justify-center text-xl bottom-[-12px] rounded-full left-1/2 -translate-x-1/2 w-[40px] h-[40px] bg-blue-500">
              +
            </div>
          </div>
          <p className="flex flex-col items-center justify-between h-1/4 text-slate-700 font-bold">
            <span></span>
            <span>Tạo tin</span>
          </p>
        </div>
        <div className="rounded-lg cursor-pointer border-[1px] hover:bg-gray-300 transition-all h-full xl:w-1/5 w-1/3 ">
          <div className="rounded-lg relative h-full w-full overflow-hidden">
            <img
              className="h-full rounded-lg  object-cover hover:scale-105 transition-all"
              src={user?.avatar ? user.avatar : "./undraw_profile.svg"}
              alt=""
            />
            <span className="absolute top-[12px] left-[12px] border-4 border-blue-500 rounded-full">
              <img
                className="rounded-full w-[35px]   "
                src={user?.avatar ? user.avatar : "./undraw_profile.svg"}
                alt=""
              />
            </span>
            <span className="absolute text-center bottom-[12px] text-white font-bold block w-full">
              {user.firstName + " " + user.lastName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
