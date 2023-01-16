import { DoorBack } from "@mui/icons-material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingAdmin from "./LoadingAdmin";

const CreateRoomBauCua = ({ setShowCreateRoom }) => {
  const navigate = useNavigate();
  const [nameRoom, setNameRoom] = useState("");
  const [passRoom, setPassRoom] = useState("");
  const [sizeRoom, setSizeRoom] = useState(0);
  const [loadingCreateRoom, setLoadingCreateRoom] = useState(false);
  const createRoom = async (e) => {
    e.preventDefault();
    if (!nameRoom || !passRoom || !sizeRoom)
      return Swal.fire("Thông báo!", "Bạn phải nhập đầy đủ thông tin!", "info");
    const data = {
      nameRoom,
      passRoom,
      sizeRoom,
    };
    console.log(data);
    try {
      setLoadingCreateRoom(true);
      const response = await axios({
        method: "POST",
        url: "auth/baucua/createRoom",
        data: data,
      });
      if (response.status == 200) {
        setLoadingCreateRoom(false);

        console.log(response);
        navigate(
          `/game/play/baucua/waiting/?roomId=${response?.data?.data?.code_room}`
        );
      }
    } catch (e) {
      setLoadingCreateRoom(false);

      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center">
      <form
        onSubmit={createRoom}
        className="relative lg:w-1/3 w-4/5 h-[90%] bg-slate-600 rounded-2xl border-2 flex gap-1 flex-col border-yellow-500 p-3"
      >
        <div className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 ">
          <img
            onClick={() => setShowCreateRoom(false)}
            src="../../../cancel.png"
            className="w-14 cursor-pointer h-14 hover:scale-110 transition-all"
            alt=""
          />
        </div>
        <h2 className="text-center font-bold text-yellow-500 mb-1 text-[35px]">
          Tạo phòng
        </h2>
        <div className="rounded-xl bg-slate-800 flex-1 px-2  lg:px-5">
          <h3 className="text-center text-yellow-400 my-3 font-bold  tracking-[8px] uppercase">
            Tên phòng
          </h3>
          <div className="my-1">
            <label htmlFor="" className="w-full text-yellow-400">
              Tên phòng
              <input
                onChange={(e) => setNameRoom(e.target.value)}
                type="text"
                placeholder="Tên phòng"
                className="form-control my-2"
              />
            </label>
          </div>
          <div className="my-1">
            <label htmlFor="" className="w-full text-yellow-400">
              Mật mã phòng
              <input
                onChange={(e) => setPassRoom(e.target.value)}
                type="password"
                placeholder="Mật mã phòng"
                className="form-control my-2"
              />
            </label>
          </div>
        </div>
        <div className="rounded-xl bg-slate-800 flex-1  px-2 lg:px-5">
          <h3 className="text-center text-yellow-400 my-3 font-bold  tracking-[8px] uppercase">
            Loại phòng
          </h3>
          <div className="grid grid-cols-12  justify-between items-center gap-3 pb-3">
            <div className="col-span-4">
              <div
                onClick={() => setSizeRoom(2)}
                className={`p-2 bg-yellow-500 cursor-pointer hover:scale-105 transition-all rounded-full border-4  border-transparent flex items-center justify-center flex-col ${
                  sizeRoom == 2 ? "border-white" : ""
                }`}
              >
                <p className="m-0">
                  <img
                    src="../../../house.png"
                    className="w-24 h-24 object-cover"
                    alt=""
                  />
                </p>
                <span className="text-black font-bold text-xl">2 người</span>
              </div>
            </div>
            <div className="col-span-4">
              <div
                onClick={() => setSizeRoom(4)}
                className={`p-2 bg-yellow-500 cursor-pointer hover:scale-105 transition-all rounded-full border-4  border-transparent flex items-center justify-center flex-col ${
                  sizeRoom == 4 ? "border-white" : ""
                }`}
              >
                <p className="m-0">
                  <img
                    src="../../../house_big.png"
                    className="w-24 h-24 object-cover"
                    alt=""
                  />
                </p>
                <span className="text-black font-bold text-xl">4 người</span>
              </div>
            </div>
            <div className="col-span-4">
              <div
                onClick={() => setSizeRoom(6)}
                className={`p-2 bg-yellow-500 cursor-pointer hover:scale-105 transition-all rounded-full border-4 border-transparent flex items-center justify-center flex-col ${
                  sizeRoom == 6 ? "border-white" : ""
                }`}
              >
                <p className="m-0">
                  <img
                    src="../../../apartment.png"
                    className="w-24 h-24 object-cover"
                    alt=""
                  />
                </p>
                <span className="text-black font-bold text-xl">6 người</span>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-slate-800 flex-1 px-2 flex items-center justify-center  lg:px-5">
          {loadingCreateRoom && <LoadingAdmin></LoadingAdmin>}
          {!loadingCreateRoom && (
            <div className="flex items-center gap-3 justify-center flex-1">
              <p
                onClick={() => {
                  setNameRoom("");
                  setPassRoom("");
                  setSizeRoom(0);
                  setShowCreateRoom(false);
                }}
                className="m-0 hover:scale-110 transition-all cursor-pointer px-5 py-3 text-xl bg-red-500 rounded-xl font-bold text-yellow-500"
              >
                Hủy
              </p>
              <button
                type="submit"
                className="m-0 hover:scale-110 transition-all px-5 py-3 text-xl bg-green-500 rounded-xl font-bold text-slate-50"
              >
                Xác nhận
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateRoomBauCua;
