import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LayoutClient from "../../layouts/LayoutClient";

const MiniGame = ({ socket }) => {
  const [tabGame, setTabGame] = useState(1);
  return (
    <LayoutClient socket={socket}>
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <div className="px-2 py-3 bg-white shadow_noti max-h-[91.5vh] h-[91.5vh] overflow-y-auto w-full">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-2xl font-bold text-black">Chơi game</span>
              <span className="text-black p-2 transition-all cursor-pointer  border rounded-full hover:bg-gray-300">
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
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
            </div>
            <div className="my-2">
              <span className="font-semibold text-black text-lg">Hạng mục</span>
              <ul className="mt-2">
                <li
                  onClick={() => setTabGame(1)}
                  className={`flex items-center  gap-3 p-2  rounded-lg hover:bg-gray-200 transition-all cursor-pointer text-lg font-semibold text-black ${
                    tabGame == 1 ? "bg-gray-200" : ""
                  }`}
                >
                  <span
                    className={`p-2 rounded-full  origin-center -rotate-45  leading-none ${
                      tabGame == 1 ? "bg-blue-500 text-white" : "bg-gray-400"
                    }`}
                  >
                    <i class="fa-solid fa-gamepad"></i>
                  </span>
                  <span>Tất cả game</span>
                </li>
                <li
                  onClick={() => setTabGame(2)}
                  className={`flex items-center  gap-3 p-2  rounded-lg hover:bg-gray-200 transition-all cursor-pointer text-lg font-semibold text-black ${
                    tabGame == 2 ? "bg-gray-200" : ""
                  }`}
                >
                  <span
                    className={`p-2 rounded-full    leading-none ${
                      tabGame == 2 ? "bg-blue-500 text-white" : "bg-gray-400"
                    }`}
                  >
                    <i class="fa-solid fa-gun"></i>
                  </span>
                  <span>Hành động</span>
                </li>
                <li
                  onClick={() => setTabGame(3)}
                  className={`flex items-center  gap-3 p-2  rounded-lg hover:bg-gray-200 transition-all cursor-pointer text-lg font-semibold text-black ${
                    tabGame == 3 ? "bg-gray-200" : ""
                  }`}
                >
                  <span
                    className={`p-2 rounded-full    leading-none ${
                      tabGame == 3 ? "bg-blue-500 text-white" : "bg-gray-400"
                    }`}
                  >
                    <i class="fa-solid fa-circle-question"></i>
                  </span>
                  <span>Đố vui</span>
                </li>
                <li
                  onClick={() => setTabGame(4)}
                  className={`flex items-center  gap-3 p-2  rounded-lg hover:bg-gray-200 transition-all cursor-pointer text-lg font-semibold text-black ${
                    tabGame == 3 ? "bg-gray-200" : ""
                  }`}
                >
                  <span
                    className={`p-2 rounded-full    leading-none ${
                      tabGame == 4 ? "bg-blue-500 text-white" : "bg-gray-400"
                    }`}
                  >
                    <i class="fa-solid fa-layer-group"></i>
                  </span>
                  <span>Trí tuệ</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-span-9 bg_anima">
          <div className="h-[91.5vh] overflow-y-auto py-3 px-4">
            <h3 className="font-bold text-black"> Tất cả game</h3>
            <div className="my-3">
              <p className="text-xl font-semibold text-black">Game phổ biến</p>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-3 ">
                  <Link
                    to="/game/play/baucua"
                    className="rounded-xl shadow_noti bg-white "
                  >
                    <div className="rounded-t-xl">
                      <img src="./baucua.png" alt="" />
                    </div>
                    <div className="px-3 py-2">
                      <p className="font-bold m-0 text-black mb-1">Bầu cua</p>
                      <p className="px-2 py-1 bg-gray-300 rounded-2xl m-0 font-bold">
                        100k người chơi
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutClient>
  );
};

export default MiniGame;
