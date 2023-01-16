import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import RuleGameBauCua from "../../components/RuleGameBauCua";
import LoadingAdmin from "../../components/LoadingAdmin";
import { ToastContainer, toast } from "react-toastify";

const WaitingRoomBauCua = ({ socket }) => {
  const { user } = useSelector((state) => state.auth);

  const search = useLocation().search;
  const roomId = new URLSearchParams(search).get("roomId");
  const navigate = useNavigate();
  const [data, setData] = useState();
  useEffect(() => {
    socket.off("userJoinRoom");

    // socket.current = io("ws://localhost:8900");
    socket?.on("userJoinRoom", (data) => {
      console.log("join room".data);
      let myAudio = new Audio("../../../../friend-request-14878.mp3");
      myAudio.play();
      toast.success(`${data.text}`, {
        position: "top-right",
        autoClose: 2000,
      });
      fetchDetailRoom();
    });
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
    socket.off("statusUserReady");

    // socket.current = io("ws://localhost:8900");
    socket?.on("statusUserReady", (data) => {
      console.log("join room".data);
      fetchDetailRoom();
    });
    socket.off("startedGameBc");

    // socket.current = io("ws://localhost:8900");
    socket?.on("startedGameBc", (data) => {
      console.log("join room".data);
      navigate(`/game/play/baucua/started/?roomId=${data.room_id}`);
    });
    return () => {
      socket.off("userExitRoom");
      socket?.off("userJoinRoom");
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
  const [loading, setLoading] = useState(false);
  const [showRule, setShowRule] = useState(true);
  const changeStatusBlockRoom = async (status = 0) => {
    try {
      setLoading(true);
      const response = await axios({
        method: "PATCH",
        url: "/auth/baucua/changeStatusBlockRoom/" + roomId,
        data: {
          blocked: status,
        },
      });

      if (response.status === 200) {
        setLoading(false);

        console.log(response);
        setData(response.data);
      }
    } catch (err) {
      setLoading(false);

      console.log(err);
      if (err.response.status == 401) {
        navigate("/login");
      }
      if (err.response.status == 400) {
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
  const [loadingDelete, setLoadingDelete] = useState(false);
  const deleteRoom = async () => {
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
  };

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

  const readyStart = async (status) => {
    try {
      const response = await axios({
        method: "PATCH",
        url: "/auth/baucua/readyStart/" + roomId + "/?status=" + status,
      });
      if (response.status === 200) {
        console.log(response);
        socket?.emit("statusReady", {
          avatar: user?.avatar,
          senderId: user?.id,
          nameSender: user?.firstName + " " + user?.lastName,
          receiverId: response.data?.user_room_data,
        });
        setData(response?.data);
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
  };
  const startGame = async () => {
    try {
      const response = await axios({
        method: "PATCH",
        url: "/auth/baucua/startGame/" + roomId,
      });
      if (response.status === 200) {
        console.log(response);
        socket?.emit("startedGame", {
          avatar: user?.avatar,
          senderId: user?.id,
          nameSender: user?.firstName + " " + user?.lastName,
          receiverId: response.data?.user_room_data,
          room_id: roomId,
        });
        navigate(
          `/game/play/baucua/started/?roomId=${response?.data?.code_room}`
        );
      }
    } catch (e) {
      console.log(e);
      if (e.response?.status === 401) {
        navigate("/login");
      }
      if (e.response?.status === 400) {
        Swal.fire("Thông báo!", `${e.response?.data}`, "info");
      }
      if (e.response?.status === 404) {
        navigate("/game/play/baucua");
      }
    }
  };
  return (
    <div className="h-screen relative overflow-hidden w-screen bg-[#111]">
      <canvas id="world"></canvas>

      <div className="absolute p-3 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-4/5 rounded-xl bg-[rgba(0,0,0,0.6)]">
        <div className="grid grid-cols-12 gap-3 h-full">
          <div className="col-span-7">
            <div className="grid grid-cols-12 gap-3 h-full ">
              {Array(data?.size)
                .fill(null)
                .map((item, index) => {
                  if (data?.user_room_data[index]) {
                    let userRoom = data?.user_room_data[index]?.user_data;
                    return (
                      <div
                        key={uuidv4() + new Date()}
                        className="col-span-6 relative max-h-[180px] min-h-[180px] "
                      >
                        {data?.user_room_data[index]?.ready == 1 && (
                          <div className="absolute z-[2] top-[17%] left-[12px]">
                            <div className="p-2 border-2 text-sm origin-center -rotate-45 text-red-500 border-red-500 rounded-lg w-fit">
                              Đã sẳn sàng
                            </div>
                          </div>
                        )}
                        <div className="rounded-lg p-3 relative  flex flex-col items-center justify-center bg-white h-full">
                          <p>
                            <img
                              className="w-24 h-24 rounded-full"
                              src={userRoom?.avatar ? userRoom?.avatar : ""}
                              alt=""
                            />
                          </p>
                          <p className="font-bold text-black">
                            {userRoom?.firstName + " " + userRoom?.lastName}
                          </p>
                          <div className="absolute flex gap-1 bg-yellow-400 rounded-xl items-center p-2 top-[8px] right-[8px]">
                            <span className="text-orange-500 font-bold">
                              {userRoom?.coin}
                            </span>
                            <span>
                              <img
                                className="w-6 h-6"
                                src="https://shoppett-e7b06.firebaseapp.com/coin2.gif"
                                alt=""
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={uuidv4() + new Date()}
                        className="col-span-6 max-h-[180px] min-h-[180px]"
                      >
                        <div className="rounded-lg flex items-center justify-center bg-white h-full">
                          <span className="text-2xl font-bold text-orange-500">
                            Waiting
                          </span>
                        </div>
                      </div>
                    );
                  }
                })}
              {Array(6 - (data?.size || 0))
                .fill(null)
                .map((item, index) => (
                  <div
                    key={uuidv4() + new Date() + index}
                    className="col-span-6 max-h-[180px] min-h-[180px]"
                  >
                    <div className="rounded-lg  flex items-center justify-center  h-full max-h-full bg-orange-500 text-orange-800 font-bold">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-16 h-16"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="col-span-5">
            <div className="flex flex-col gap-3 h-full">
              <div className="rounded-lg py-3 px-2 font-bold text-white  border">
                <p className="m-0 flex gap-2">
                  <span>Tên phòng:</span>
                  <span className="text-orange-500">{data?.name}</span>
                </p>
                {user?.id === data?.own_room && (
                  <>
                    <p className="my-2 flex gap-2 items-center w-full">
                      <span>Mã phòng:</span>
                      <span className="text-sm text-orange-500">
                        {" "}
                        {data?.code_room}
                      </span>
                    </p>
                    <p className="my-2 flex gap-2 items-center w-full">
                      <span>Mật khẩu:</span>
                      <span className="text-sm text-orange-500">
                        {" "}
                        {data?.password}
                      </span>
                    </p>
                  </>
                )}
                <p className="m-0 flex gap-2">
                  <span>Số lượng tối đa:</span>
                  <span className="text-orange-500">{data?.size}</span>
                </p>
              </div>
              <div className="flex-1 h-full rounded-lg border p-3">
                <div className="rounded-full text-center grid grid-cols-12 gap-3">
                  {+user?.id === +data?.own_room && (
                    <div onClick={startGame} className="col-span-12">
                      <div className="w-full flex items-center gap-3 p-1 px-3 bg-gray-200 cursor-pointer hover:scale-110 transition-all rounded-full">
                        <img
                          className="w-12 h-12"
                          src="http://localhost:5173/fast.png"
                          alt=""
                        />
                        <span className="text-black font-bold text-xl">
                          Bắt đầu
                        </span>
                      </div>
                    </div>
                  )}
                  {+user?.id !== +data?.own_room &&
                    data?.user_room_data?.map((userRoom) => {
                      if (userRoom?.user_id === user?.id) {
                        if (userRoom.ready === 1) {
                          return (
                            <div
                              onClick={() => readyStart(0)}
                              className="col-span-12"
                            >
                              <div className="w-full flex items-center gap-3 p-1 px-3 bg-gray-200 cursor-pointer hover:scale-110 transition-all rounded-full">
                                <img
                                  className="w-12 h-12"
                                  src="http://localhost:5173/speed.png"
                                  alt=""
                                />
                                <span className="text-black font-bold text-xl">
                                  Hủy sẵn sàng
                                </span>
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div
                              onClick={() => readyStart(1)}
                              className="col-span-12"
                            >
                              <div className="w-full flex items-center gap-3 p-1 px-3 bg-gray-200 cursor-pointer hover:scale-110 transition-all rounded-full">
                                <img
                                  className="w-12 h-12"
                                  src="http://localhost:5173/speed.png"
                                  alt=""
                                />
                                <span className="text-black font-bold text-xl">
                                  Sẵn sàng
                                </span>
                              </div>
                            </div>
                          );
                        }
                      }
                    })}
                  <div className="col-span-12">
                    <Link
                      to="/home"
                      className="w-full flex items-center gap-3 p-1 px-3 bg-gray-200 cursor-pointer hover:scale-110 transition-all rounded-full"
                    >
                      <img
                        className="w-12 h-12"
                        src="http://localhost:5173/fire.png"
                        alt=""
                      />
                      <span className="text-black font-bold text-xl">
                        Về trang chủ
                      </span>
                    </Link>
                  </div>
                  <div
                    onClick={() => setShowRule(true)}
                    className="col-span-12"
                  >
                    <div className="w-full flex items-center gap-3 p-1 px-3 bg-gray-200 cursor-pointer hover:scale-110 transition-all rounded-full">
                      <img
                        className="w-12 h-12"
                        src="http://localhost:5173/information.png"
                        alt=""
                      />
                      <span className="text-black font-bold text-xl">
                        Luật chơi
                      </span>
                    </div>
                  </div>
                  {+user?.id === +data?.own_room && (
                    <>
                      {loading ? (
                        <LoadingAdmin></LoadingAdmin>
                      ) : data?.blocked == 0 ? (
                        <div
                          onClick={() => changeStatusBlockRoom(1)}
                          className="col-span-12"
                        >
                          <div className="w-full flex items-center gap-3 p-1 px-3 bg-gray-200 cursor-pointer hover:scale-110 transition-all rounded-full">
                            <img
                              className="w-12 h-12"
                              src="http://localhost:5173/ad.png"
                              alt=""
                            />
                            <span className="text-black font-bold text-xl">
                              Khóa phòng
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => changeStatusBlockRoom(0)}
                          className="col-span-12"
                        >
                          <div className="w-full flex items-center gap-3 p-1 px-3 bg-gray-200 cursor-pointer hover:scale-110 transition-all rounded-full">
                            <img
                              className="w-12 h-12"
                              src="http://localhost:5173/ad.png"
                              alt=""
                            />
                            <span className="text-black font-bold text-xl">
                              Mở khóa phòng
                            </span>
                          </div>
                        </div>
                      )}
                      <div onClick={deleteRoom} className="col-span-12">
                        <div className="w-full flex items-center gap-3 p-1 px-3 bg-gray-200 cursor-pointer hover:scale-110 transition-all rounded-full">
                          <img
                            className="w-12 h-12"
                            src="http://localhost:5173/delete-button.png"
                            alt=""
                          />
                          <span className="text-black font-bold text-xl">
                            Xóa phòng
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                  {+user?.id !== +data?.own_room && (
                    <div onClick={exitRoom} className="col-span-12">
                      <div className="w-full flex items-center gap-3 p-1 px-3 bg-gray-200 cursor-pointer hover:scale-110 transition-all rounded-full">
                        <img
                          className="w-12 h-12"
                          src="http://localhost:5173/delete-button.png"
                          alt=""
                        />
                        <span className="text-black font-bold text-xl">
                          Thoát phòng
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showRule && <RuleGameBauCua setShowRule={setShowRule}></RuleGameBauCua>}
    </div>
  );
};

export default WaitingRoomBauCua;
