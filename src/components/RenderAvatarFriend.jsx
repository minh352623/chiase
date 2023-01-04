import React from "react";
import { data } from "../dataFake";

const RenderAvartarFriend = ({ size, friendUser, id_user }) => {
  let count = 1;
  return (
    <>
      <div className="flex relative items-center flex-1 h-[50px]">
        {friendUser &&
          friendUser.map((item, index) => {
            let position = "left-0";
            if (index > 0) {
              position = `left-${index}`;
            }
            if (+item.recie_data.id != +id_user) {
              if (index + 1 > size && count == 1) {
                count = 0;
                return (
                  <span
                    key={item.recie_data.name}
                    className={` border-2 z-${index} border-white rounded-full  w-[30px] h-[30px] ${position} absolute  text-slate-50 flex items-center justify-center rounded-full bg-orange-400`}
                  >
                    +{data.length - size}
                  </span>
                );
              } else if (count == 1) {
                return (
                  <span
                    key={item.recie_data.name}
                    className={`border-2 border-white z-${index} rounded-full ${position} absolute `}
                  >
                    <img
                      className={`object-cover  w-[30px] h-[30px]   rounded-full`}
                      src={item.recie_data.avatar}
                      alt=""
                    />
                  </span>
                );
              }
            }
            if (+item.sender_data.id != +id_user) {
              if (index + 1 > size && count == 1) {
                count = 0;
                return (
                  <span
                    key={item.sender_data.name}
                    className={` border-2 z-${index} border-white rounded-full  w-[30px] h-[30px] ${position} absolute  text-slate-50 flex item.sender_datas-center justify-center rounded-full bg-orange-400`}
                  >
                    +{data.length - size}
                  </span>
                );
              } else if (count == 1) {
                return (
                  <span
                    key={item.sender_data.name}
                    className={`border-2 border-white z-${index} rounded-full ${position} absolute `}
                  >
                    <img
                      className={`object-cover  w-[30px] h-[30px]   rounded-full`}
                      src={item.sender_data.avatar || "../undraw_profile.svg"}
                      alt=""
                    />
                  </span>
                );
              }
            }
          })}
      </div>
    </>
  );
};

export default RenderAvartarFriend;
