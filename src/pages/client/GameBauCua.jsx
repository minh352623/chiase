import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import RuleGameBauCua from "../../components/RuleGameBauCua";
import CreateRoomBauCua from "../../components/CreateRoomBauCua";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useEffect } from "react";
import LoadingAdmin from "../../components/LoadingAdmin";
import Swal from "sweetalert2";

const GameBauCua = ({ socket }) => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState();
  const { user } = useSelector((state) => state.auth);
  const [showRule, setShowRule] = useState(true);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = React.useState(1);
  const [loadingRooms, setLoadingRooms] = React.useState(false);
  const fetchRooms = async () => {
    try {
      setLoadingRooms(true);
      const response = await axios({
        url: `/auth/baucua/getAll/?page=${page}&keyword=${query}`,
      });
      if (response.status === 200) {
        console.log(response);
        setLoadingRooms(false);

        setRooms(response.data);
      }
    } catch (e) {
      console.log(e);
      setLoadingRooms(false);

      if (e.response.status === 401) {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    fetchRooms();
  }, [page, query]);
  //phan trang
  const [pageCount, setPageCount] = React.useState(0);
  const [itemOffset, setItemOffset] = React.useState(0);
  const { per_page } = rooms || [];
  //   //console.log(per_page);
  React.useEffect(() => {
    if (!rooms || !rooms.count) return;

    rooms && setPageCount(Math.ceil(rooms.count / per_page));
  }, [itemOffset, rooms]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * per_page) % rooms.count;
    setItemOffset(newOffset);
    setPage(event.selected + 1);
  };

  //end phan trang

  const joinRoom = async (idRoom) => {
    console.log(idRoom);
    Swal.fire({
      title: "Vui lòng nhập mật khẩu!",
      input: "password",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Join",
      showLoaderOnConfirm: true,
      preConfirm: async (password) => {
        console.log(password);
        try {
          const response = await axios({
            url: "/auth/baucua/joinRoom/" + idRoom + `/${password}`,
          });
          if (response.status === 200) {
            console.log(response);
            socket?.emit("joinRoom", {
              avatar: user?.avatar,
              senderId: user?.id,
              nameSender: user?.firstName + " " + user?.lastName,
              receiverId: response.data?.user_room_data,
              text:
                user?.firstName + " " + user?.lastName + " đã tham gia phòng!",
            });
            navigate(
              `/game/play/baucua/waiting/?roomId=${response?.data?.code_room}`
            );
          }
        } catch (e) {
          console.log(e);
          if (e.response.status == 401) {
            navigate("/login");
          }
          if (e.response.status == 400) {
            Swal.fire("Thông báo!", `${e.response?.data}`, "info");
          }
          if (e.response.status == 404) {
            fetchRooms();
            Swal.fire("Thông báo!", `${e.response?.data}`, "info");
          }
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
  return (
    <div className="max-w-[100vw] w-[100vw] max-h-[100vh] h-[100vh] bg_baucua flex items-center justify-center">
      {showRule && <RuleGameBauCua setShowRule={setShowRule}></RuleGameBauCua>}
      {showCreateRoom && (
        <CreateRoomBauCua
          setShowCreateRoom={setShowCreateRoom}
        ></CreateRoomBauCua>
      )}
      <div className="w-3/4 overflow-hidden max-h-4/5  h-4/5 bg-emerald-600 p-3 rounded-2xl">
        <div className="grid grid-cols-12 gap-3 h-full">
          <div className="col-span-9">
            <div className="flex flex-col justify-center items-center h-full">
              <h3 className="px-4 py-2 rounded-xl bg-emerald-800 text-white  w-fit ">
                Phòng game
              </h3>
              <div className="flex-1 w-full h-full">
                <div className="rounded-xl h-full">
                  <table
                    className="max-h-[90%] w-full bg-emerald-900 rounded-xl "
                    aria-label="simple table"
                  >
                    <TableHead className="text-white">
                      <TableRow>
                        <TableCell className="text-white w-[5%]">ID</TableCell>
                        <TableCell className="text-white w-[30%]" align="left">
                          Tên phòng
                        </TableCell>
                        <TableCell className="text-white" align="left">
                          Loại phòng
                        </TableCell>
                        <TableCell className="text-white" align="left">
                          Số người
                        </TableCell>
                        <TableCell
                          className="text-white  w-[25%]"
                          align="right"
                        >
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loadingRooms && <LoadingAdmin></LoadingAdmin>}
                      {!loadingRooms &&
                        rooms?.data?.length > 0 &&
                        rooms?.data?.map((room) => (
                          <TableRow
                            key={room.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                            className="h-fit"
                          >
                            <TableCell component="th" scope="row">
                              <span className="text-yellow-500 text-lg font-bold">
                                {room?.id}
                              </span>
                            </TableCell>
                            <TableCell component="th" scope="row">
                              <span className="text-yellow-500 text-lg font-bold">
                                {room?.name}
                              </span>
                            </TableCell>
                            <TableCell component="th" scope="row">
                              <span className="text-yellow-500 text-lg font-bold">
                                {room?.size == 2
                                  ? "Phòng thường"
                                  : room.size == 4
                                  ? "Phòng Vip"
                                  : room.size == 6
                                  ? "Phòng cao cấp"
                                  : ""}
                              </span>
                            </TableCell>
                            <TableCell component="th" scope="row">
                              <span className="text-yellow-500 text-lg font-bold">
                                {room?.count_user + " / " + room?.size}
                              </span>
                            </TableCell>
                            <TableCell align="right" component="th" scope="row">
                              {room?.count_user == room?.size ? (
                                <span className="cursor-pointer hover:scale-105 transition-all text-white font-bold px-4 py-2 bg-red-500 rounded-lg">
                                  Đã đầy
                                </span>
                              ) : (
                                <span
                                  onClick={() => joinRoom(room.id)}
                                  className="cursor-pointer hover:scale-105 transition-all text-white font-bold px-4 py-2 rounded-lg bg-yellow-500"
                                >
                                  Vào Phòng
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      {!loadingRooms &&
                        (!rooms?.data || rooms?.data?.length <= 0) && (
                          <TableCell
                            colSpan="4"
                            className="w-full flex justify-center items-center text-center"
                          >
                            <span className=" text-2xl font-bold text-red-500">
                              Chưa có phòng nào được tạo
                            </span>
                          </TableCell>
                        )}
                    </TableBody>
                  </table>
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    }
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    }
                    renderOnZeroPageCount={null}
                    className="pagination"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 text-white flex flex-col">
            <p className="font-bold">Thông tin</p>
            <div className="flex flex-col justify-between gap-5 flex-1">
              <div className="border-2 rounded-xl p-3">
                <div className="rounded-full text-center flex justify-center flex-col items-center">
                  <img
                    className="w-24 h-24 rounded-full"
                    src={
                      user?.avatar
                        ? user?.avatar
                        : "http://localhost:5173/undraw_profile.svg"
                    }
                    alt=""
                  />
                  <p className="text-2xl font-bold tracking-[4px] my-2">
                    {user?.firstName + " " + user?.lastName}
                  </p>
                  <div className="flex items-center font-bold gap-3">
                    <span className="text-xl text-yellow-500">
                      {user?.coin}
                    </span>
                    <span>
                      <img
                        className="w-8 h-8"
                        src="https://shoppett-e7b06.firebaseapp.com/coin2.gif"
                        alt=""
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-2 rounded-xl p-3 flex-1 ">
                <div className="rounded-full text-center grid grid-cols-12 gap-3">
                  <div className="col-span-12">
                    <div className="w-full flex items-center gap-3 py-1 px-3 bg-gray-200 cursor-pointer hover:scale-110 transition-all rounded-full">
                      <img className="w-12 h-12" src="../../join.png" alt="" />
                      <span className="text-black font-bold text-xl">
                        Join phòng
                      </span>
                    </div>
                  </div>
                  <div
                    onClick={() => setShowCreateRoom(true)}
                    className="col-span-12"
                  >
                    <div className="w-full flex items-center gap-3 p-1 px-3 bg-gray-200 cursor-pointer hover:scale-110 transition-all rounded-full">
                      <img className="w-12 h-12" src="../../admin.png" alt="" />
                      <span className="text-black font-bold text-xl">
                        Tạo phòng
                      </span>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <Link
                      to="/home"
                      className="w-full flex items-center gap-3 p-1 px-3 bg-gray-200 cursor-pointer hover:scale-110 transition-all rounded-full"
                    >
                      <img className="w-12 h-12" src="../../fire.png" alt="" />
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
                        src="../../information.png"
                        alt=""
                      />
                      <span className="text-black font-bold text-xl">
                        Luật chơi
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBauCua;
