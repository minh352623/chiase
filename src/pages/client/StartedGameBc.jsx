import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { handleFetchCoin } from "../../store/reducers/userReducer";
import Swal from "sweetalert2";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const StartedGameBc = ({ socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const search = useLocation().search;
  const roomId = new URLSearchParams(search).get("roomId");
  const navigate = useNavigate();
  const [data, setData] = useState();
  const { coin } = useSelector((state) => state.user);
  useEffect(() => {
    socket.off("userExitRoom");

    // socket.current = io("ws://localhost:8900");
    socket?.on("userExitRoom", (data) => {
      console.log("join room".data);
      if (user?.id !== data?.senderId) {
        let myAudio = new Audio("../../../../friend-request-14878.mp3");
        myAudio.play();
        toast.success(`${data.text}`, {
          position: "top-right",
          autoClose: 2000,
        });
        fetchDetailRoom();
      }
    });
    socket.off("deleteOwnRoom");

    // socket.current = io("ws://localhost:8900");
    socket?.on("deleteOwnRoom", (data) => {
      console.log("join room".data);
      let myAudio = new Audio("../../../../friend-request-14878.mp3");
      myAudio.play();
      toast.success(`${data.text}`, {
        position: "top-right",
        autoClose: 2000,
      });
      navigate("/game/play/baucua");
    });
    return () => {
      socket.off("userExitRoom");
      socket.off("deleteOwnRoom");
    };
  }, []);
  useEffect(() => {
    (function () {
      var COLORS,
        Confetti,
        NUM_CONFETTI,
        PI_2,
        canvas,
        confetti,
        context,
        drawCircle,
        i,
        range,
        resizeWindow,
        xpos;

      NUM_CONFETTI = 350;

      COLORS = [
        [85, 71, 106],
        [174, 61, 99],
        [219, 56, 83],
        [244, 92, 68],
        [248, 182, 70],
      ];

      PI_2 = 2 * Math.PI;

      canvas = document.getElementById("world");

      context = canvas.getContext("2d");

      window.w = 0;

      window.h = 0;

      resizeWindow = function () {
        window.w = canvas.width = window.innerWidth;
        return (window.h = canvas.height = window.innerHeight);
      };

      window.addEventListener("resize", resizeWindow, false);

      window.onload = function () {
        return setTimeout(resizeWindow, 0);
      };

      range = function (a, b) {
        return (b - a) * Math.random() + a;
      };

      drawCircle = function (x, y, r, style) {
        context.beginPath();
        context.arc(x, y, r, 0, PI_2, false);
        context.fillStyle = style;
        return context.fill();
      };

      xpos = 0.5;

      document.onmousemove = function (e) {
        return (xpos = e.pageX / w);
      };

      window.requestAnimationFrame = (function () {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
            return window.setTimeout(callback, 1000 / 60);
          }
        );
      })();

      Confetti = class Confetti {
        constructor() {
          this.style = COLORS[~~range(0, 5)];
          this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
          this.r = ~~range(2, 6);
          this.r2 = 2 * this.r;
          this.replace();
        }

        replace() {
          this.opacity = 0;
          this.dop = 0.03 * range(1, 4);
          this.x = range(-this.r2, w - this.r2);
          this.y = range(-20, h - this.r2);
          this.xmax = w - this.r;
          this.ymax = h - this.r;
          this.vx = range(0, 2) + 8 * xpos - 5;
          return (this.vy = 0.7 * this.r + range(-1, 1));
        }

        draw() {
          var ref;
          this.x += this.vx;
          this.y += this.vy;
          this.opacity += this.dop;
          if (this.opacity > 1) {
            this.opacity = 1;
            this.dop *= -1;
          }
          if (this.opacity < 0 || this.y > this.ymax) {
            this.replace();
          }
          if (!(0 < (ref = this.x) && ref < this.xmax)) {
            this.x = (this.x + this.xmax) % this.xmax;
          }
          return drawCircle(
            ~~this.x,
            ~~this.y,
            this.r,
            `${this.rgb},${this.opacity})`
          );
        }
      };

      confetti = (function () {
        var j, ref, results;
        results = [];
        for (
          i = j = 1, ref = NUM_CONFETTI;
          1 <= ref ? j <= ref : j >= ref;
          i = 1 <= ref ? ++j : --j
        ) {
          results.push(new Confetti());
        }
        return results;
      })();

      window.step = function () {
        var c, j, len, results;
        requestAnimationFrame(step);
        context.clearRect(0, 0, w, h);
        results = [];
        for (j = 0, len = confetti.length; j < len; j++) {
          c = confetti[j];
          results.push(c.draw());
        }
        return results;
      };

      step();
    }.call(this));
  }, []);
  useEffect(() => {
    dispatch(handleFetchCoin());
  }, []);
  const fetchDetailRoom = async () => {
    try {
      const response = await axios({
        url: "/auth/baucua/getDetail/" + roomId,
      });
      if (response.status === 200) {
        console.log(response);
        setData(response.data);
      }
    } catch (e) {
      console.log(e);
      if (e.response.status === 401) {
        navigate("/login");
      }
      if (e.response.status === 400) {
        Swal.fire({
          title: e.response.data,
          confirmButtonText: "Trở về",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            navigate("/game/play/baucua");
          }
        });
      }
    }
  };
  useEffect(() => {
    fetchDetailRoom();
  }, []);
  const exitRoom = async () => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn thoát?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đông ý!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios({
            method: "PATCH",
            url: "/auth/baucua/exitRoom/" + roomId,
          });
          if (response.status === 200) {
            console.log(response);
            socket?.emit("exitRoom", {
              avatar: user?.avatar,
              senderId: user?.id,
              nameSender: user?.firstName + " " + user?.lastName,
              receiverId: response.data?.user_room_data,
              text:
                user?.firstName +
                " " +
                user?.lastName +
                " đã thoát khỏi phòng!",
            });
            navigate("/game/play/baucua");
          }
        } catch (e) {
          console.log(e);
          if (e.response.status === 401) {
            navigate("/login");
          }
          if (e.response.status === 400) {
            navigate("/game/play/baucua");
          }
        }
      }
    });
  };
  const [loadingDelete, setLoadingDelete] = useState(false);

  const deleteRoom = async () => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đông ý!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoadingDelete(true);

          const response = await axios({
            method: "DELETE",
            url: "/auth/baucua/deleteRoom/" + roomId,
          });

          if (response.status === 200) {
            setLoadingDelete(false);
            console.log(response);
            socket?.emit("deleteRoom", {
              avatar: user?.avatar,
              senderId: user?.id,
              nameSender: user?.firstName + " " + user?.lastName,
              receiverId: response.data?.user_room_data,
              text: "Phòng đã bị xóa!",
            });
            // navigate("/game/play/baucua");
          }
        } catch (e) {
          setLoadingDelete(false);

          console.log(e);
          if (e.response.status === 401) {
            navigate("/login");
          }
          if (e.response.status === 400) {
            navigate("/game/play/baucua");
          }
        }
      }
    });
  };
  return (
    <div className="h-screen relative overflow-hidden w-screen bg-[#111]">
      <canvas id="world"></canvas>
      <div className="absolute xl:w-[90%] p-4 bg-[url('http://localhost:5173/bg_start.jpg')] bg-no-repeat bg-cover xl:h-[90%] bg-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl">
        <div className="h-[80%]">
          <div className="grid grid-cols-12 gap-3 h-full">
            <div className="col-span-2">
              <div className="flex items-center justify-start flex-col gap-3 py-5">
                <div className="relative ml-8 border-4 text-end border-yellow-500 border-l-transparent rounded-xl py-2 pr-4 pl-[100px]">
                  <span className="text-2xl text-end font-bold text-yellow-400">
                    {coin}
                  </span>
                  <div className="absolute left-[-12px] top-1/2 -translate-y-1/2">
                    <img
                      src="http://localhost:5173/dollar.png"
                      className="w-1/2"
                      alt=""
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <div onClick={exitRoom} className="col-span-12 my-3">
                    <div className="w-full flex items-center gap-3 p-2 px-3 bg-gray-200 cursor-pointer hover:scale-110 transition-all rounded-full">
                      <img
                        className="w-10 h-10"
                        src="http://localhost:5173/top-up.png"
                        alt=""
                      />
                      <span className="text-black text-lg font-bold ">
                        Nạp thêm
                      </span>
                    </div>
                  </div>
                  {+user?.id !== +data?.own_room && (
                    <div onClick={exitRoom} className="col-span-12">
                      <div className="w-full flex items-center gap-3 p-2 px-3 bg-gray-200 cursor-pointer hover:scale-110 transition-all rounded-full">
                        <img
                          className="w-10 h-10"
                          src="http://localhost:5173/delete-button.png"
                          alt=""
                        />
                        <span className="text-black text-lg font-bold ">
                          Thoát phòng
                        </span>
                      </div>
                    </div>
                  )}
                  {+user?.id === +data?.own_room && (
                    <div onClick={deleteRoom} className="col-span-12">
                      <div className="w-full flex items-center gap-3 p-2 px-3 bg-gray-200 cursor-pointer hover:scale-110 transition-all rounded-full">
                        <img
                          className="w-10 h-10"
                          src="http://localhost:5173/delete-button.png"
                          alt=""
                        />
                        <span className="text-black text-lg font-bold ">
                          Xóa phòng
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-10 h-full">
              <div className="p-3 h-full">
                <div className="grid grid-cols-12 gap-3 h-full">
                  <div className="col-span-9 h-full">
                    <div className="p-2 h-full flex items-center justify-center w-full">
                      <div className="border-[16px] border-green-700 rounded-2xl p-5 bg-green-500 h-[85%] w-full">
                        <div className="grid grid-cols-12 gap-3 ">
                          <div className="col-span-3 row-span-1 ">
                            <div className="rounded-2xl p-3 flex justify-center items-center bg-white">
                              <img
                                className="w-[100px] h-[100px] object-cover"
                                src="http://localhost:5173/gourd.png"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="col-span-6 row-span-1 ">
                            <div className="rounded-2xl relative p-3 flex justify-center items-center ">
                              <img
                                className="absolute  object-cover"
                                src="http://localhost:5173/box_xingau-removebg-preview.png"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="col-span-3 row-span-1">
                            <div className="rounded-2xl p-3 flex justify-center items-center bg-white">
                              <img
                                className="w-[100px] h-[100px] object-cover"
                                src="http://localhost:5173/crab.png"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="col-span-3 row-span-1">
                            <div className="rounded-2xl p-3 flex justify-center items-center bg-white">
                              <img
                                className="w-[100px] h-[100px] object-cover"
                                src="http://localhost:5173/crayfish.png"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="col-span-3 row-span-1">
                            <div className="rounded-2xl p-3 flex justify-center items-center bg-white ">
                              <img
                                className="w-[100px] h-[100px] object-cover"
                                src="http://localhost:5173/fish.png"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="col-span-3 row-span-1">
                            <div className="rounded-2xl p-3 flex justify-center items-center bg-white">
                              <img
                                className="w-[100px] h-[100px] object-cover"
                                src="http://localhost:5173/reindeer.png"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="col-span-3">
                            <div className="rounded-2xl p-3 flex justify-center items-center bg-white">
                              <img
                                className="w-[100px] h-[100px] object-cover"
                                src="http://localhost:5173/rooster.png"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 h-full">
                    <div className="flex flex-col gap-2 h-full">
                      <div className="p-3  border-2 rounded-xl font-bold bg-white">
                        <p className="m-0 flex gap-2">
                          <span className="text-black">Tên phòng:</span>
                          <span className="text-yellow-400">{data?.name}</span>
                        </p>
                        <p className="my-2 flex gap-2 items-center w-full">
                          <span> Phòng:</span>
                          <span className="text-yellow-400">{data?.id}</span>
                        </p>
                        <p className="my-2 flex gap-2 items-center w-full">
                          <span>Mã phòng:</span>
                          <span className="text- text-yellow-400">
                            {" "}
                            {data?.code_room}
                          </span>
                        </p>
                        {user?.id === data?.own_room && (
                          <>
                            <p className="my-2 flex gap-2 items-center w-full">
                              <span>Mật khẩu:</span>
                              <span className="text- text-yellow-400">
                                {" "}
                                {data?.password}
                              </span>
                            </p>
                          </>
                        )}
                        <p className="m-0 flex gap-2">
                          <span>Số lượng tối đa:</span>
                          <span className="text-yellow-400">{data?.size}</span>
                        </p>
                      </div>
                      <div className="p-3  border-2 rounded-xl font-bold bg-white flex-1">
                        <h5 className="text-black font-bold">Lịch sử</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[20%]">
          <div className="col-span-12 h-full">
            <div className="border-t-4 border-yellow-500 pt-2 flex gap-5 justify-between items-center">
              <div className="flex gap-3 items-center  px-3">
                <span className="rounded-full border-4  p-2 ">
                  <img
                    className="max-w-[300px] w-[100px] rounded-full "
                    src={
                      user?.avatar
                        ? user?.avatar
                        : "http://localhost:5173/undraw_profile.svg"
                    }
                    alt=""
                  />
                </span>
                <p className="m-0">
                  <span className="font-bold text-xl text-yellow-400">
                    {user?.firstName + " " + user?.lastName}
                  </span>
                  <span className="flex gap-3 text-white my-2 text-xl font-bold">
                    <span>Số tiền đã cược:</span>
                    <span className="text-yellow-400">0</span>
                  </span>
                </p>
              </div>
              <div className="flex gap-5 items-center bg-white rounded-2xl py-1 px-3">
                <span className="rounded-full p-1 flex justify-center items-center border-2 border-red-500">
                  <img
                    className="w-[120px] flex justify-center items-center h-[120px] rounded-full object-cover"
                    src="http://localhost:5173/chip_10-removebg-preview.png"
                    alt=""
                  />
                </span>
                <span className="rounded-full p-1 flex justify-center items-center border-2 border-red-500">
                  <img
                    className="w-[120px] flex justify-center items-center h-[120px] rounded-full object-cover"
                    src="http://localhost:5173/chip_50-removebg-preview.png"
                    alt=""
                  />
                </span>
                <span className="rounded-full p-1 flex justify-center items-center border-2 border-red-500">
                  <img
                    className="w-[120px] flex justify-center items-center h-[120px] rounded-full object-cover"
                    src="http://localhost:5173/chip_100-removebg-preview.png"
                    alt=""
                  />
                </span>
                <span className="rounded-full p-1 flex justify-center items-center border-2 border-red-500">
                  <img
                    className="w-[120px] flex justify-center items-center h-[120px] rounded-full object-cover"
                    src="http://localhost:5173/chip_500-removebg-preview.png"
                    alt=""
                  />
                </span>
              </div>
              <div className="flex  gap-3 flex-col">
                <span className="px-4 py-2 w-[150px] text-center cursor-pointer hover:scale-110 transition-all text-white font-bold text-xl rounded-xl bg-green-500">
                  Chốt
                </span>
                <span className="px-4 py-2 w-[150px] text-center cursor-pointer hover:scale-110 transition-all text-white font-bold text-xl rounded-xl bg-green-500">
                  Đặt lại
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartedGameBc;
