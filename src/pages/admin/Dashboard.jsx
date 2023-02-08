import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import LoadingAdmin from "../../components/LoadingAdmin";
import LayoutAdmin from "../../layouts/LayoutAdmin";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment-timezone";
import lodash from "lodash";
import { ExportExcel } from "../../trait/ExportExcel";

const Dashboard = ({ socket }) => {
  const navigate = useNavigate();
  const [dataFlexHeader, setDataFlexHeader] = useState();
  const [onlineUser, setOnlineUser] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const fetchFlexHeaderDashBoard = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: "/auth/dashboard/flexHeader",
      });
      if (response.status === 200) {
        console.log(response);
        setLoading(false);
        setDataFlexHeader(response.data);
      }
    } catch (e) {
      setLoading(false);

      console.log(e);
      if (e.response.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchFlexHeaderDashBoard();
  }, []);
  useEffect(() => {
    const getManagerOnlineUser = async () => {
      try {
        setLoading(true);

        const response = await axios({
          url:
            "/auth/dashboard/manager_user_online?page=" +
            page +
            "&keyword=" +
            query,
        });
        if (response.status === 200) {
          setLoading(false);

          console.log(response);
          setOnlineUser(response.data);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);

        if (e.target.response === 401) {
          navigate("/login");
        }
      }
    };
    getManagerOnlineUser();
  }, [page, query]);
  //phan trang
  const [pageCount, setPageCount] = React.useState(0);
  const [itemOffset, setItemOffset] = React.useState(0);
  const { per_page } = onlineUser || [];
  //   //console.log(per_page);
  React.useEffect(() => {
    if (!onlineUser || !onlineUser.count) return;

    onlineUser && setPageCount(Math.ceil(onlineUser.count / per_page));
  }, [itemOffset, onlineUser]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * per_page) % onlineUser.count;
    setItemOffset(newOffset);
    setPage(event.selected + 1);
  };

  //end phan trang

  const handleSearch = lodash.debounce((e) => {
    setQuery(e.target.value);
  }, 700);
  const ExportExcelUsers = async () => {
    try {
      const repsonse = await axios({
        url: "/auth/dashboard/exportExcelInfoOnline?keyword=" + query,
      });
      if (repsonse.status === 200) {
        console.log(repsonse);
        await ExportExcel(
          repsonse.data,
          "Danh sách thong tin online",
          "info_online_user"
        );
      }
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        navigate("/admin/login");
      }
    }
  };
  return (
    <>
      <LayoutAdmin socket={socket}>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
          <a
            href="#"
            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          >
            <i className="fas fa-download fa-sm text-white-50"></i> Generate
            Report
          </a>
        </div>

        <div className="row">
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Tổng account
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {dataFlexHeader?.totalAccount}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                      Tổng bài viết
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {dataFlexHeader?.totalPost}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-info shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                      Tống báo cáo chưa duyệt
                    </div>
                    <div className="row no-gutters align-items-center">
                      <div className="col-auto">
                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                          {dataFlexHeader?.totalReport}
                        </div>
                      </div>
                      <div className="col">
                        <div className="progress progress-sm mr-2">
                          <div
                            className="progress-bar bg-info w-1/2"
                            role="progressbar"
                            aria-valuenow="50"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-comments fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-warning shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      Tổng nhóm người dùng
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {dataFlexHeader?.totalGroup}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-comments fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading && <LoadingAdmin></LoadingAdmin>}
        {!loading && (
          <>
            <div className="my-3 text-center font-bold text-2xl">
              Thống kê thông tin online của khách hàng
            </div>
            <div className="my-3 flex justify-between">
              <form action="">
                <div className="flex">
                  <input
                    type="text"
                    onChange={handleSearch}
                    className="form-control"
                    placeholder="Tìm kiếm..."
                  />
                </div>
              </form>
              <span
                onClick={ExportExcelUsers}
                className="px-4 py-2 border-2 rounded-lg font-semibold no-underline hover:bg-green-500 transition-all hover:text-slate-50 text-green-500 cursor-pointer border-green-500"
              >
                Export Excel
              </span>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="w-[1%]">Stt</TableCell>
                    <TableCell align="left" className="w-[20%]">
                      Thông tin
                    </TableCell>
                    <TableCell align="right" className="w-[5%]">
                      Avatar
                    </TableCell>
                    <TableCell className="w-[5%]" align="right">
                      Giới tính
                    </TableCell>
                    <TableCell className="w-[5%]" align="right">
                      Vị trí
                    </TableCell>
                    <TableCell className="w-[15%]" align="right">
                      Tổng thời gian online
                    </TableCell>
                    <TableCell className="w-[16%]" align="right">
                      Số thiết bị đã đăng nhập
                    </TableCell>
                    <TableCell align="right">
                      Thiết bị đã từng đăng nhập
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {onlineUser?.data &&
                    onlineUser?.data.map((user, index) => (
                      <TableRow
                        key={user.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell align="left">
                          <p>
                            <span className="italic text-gray-600 font-semibold">
                              Fullname:{" "}
                            </span>
                            <span className="font-semibold">
                              {user.user_data.firstName +
                                " " +
                                user.user_data.lastName}
                            </span>
                          </p>
                          <p>
                            <span className="italic text-gray-600 font-semibold">
                              Email:{" "}
                            </span>
                            <span className="font-semibold">
                              {user.user_data.email}
                            </span>
                          </p>
                          <p>
                            <span className="italic text-gray-600 font-semibold">
                              Address:{" "}
                            </span>
                            <span className="font-semibold">
                              {user.user_data.address}
                            </span>
                          </p>
                          <p>
                            <span className="italic text-gray-600 font-semibold">
                              Phone:{" "}
                            </span>
                            <span className="font-semibold">
                              {" "}
                              {user.user_data.phone}
                            </span>
                          </p>
                        </TableCell>
                        <TableCell align="right">
                          <img
                            src={
                              user.user_data.avatar
                                ? user.user_data.avatar
                                : "../undraw_profile.svg"
                            }
                            className="rounded-full"
                            alt=""
                          />
                        </TableCell>
                        <TableCell align="right">
                          <span className="font-bold text-green-500 text-lg">
                            {user.user_data.gender == 1 ? "Female" : "Male"}
                          </span>
                        </TableCell>
                        <TableCell align="right">
                          <span className="font-bold text-yellow-500 text-lg">
                            {user.user_data.group_data?.name}
                          </span>
                        </TableCell>
                        <TableCell align="right">
                          <p className="m-0 flex justify-end gap-2 text-red-500 font-bold">
                            <span>
                              {parseFloat(user.total_time_online).toFixed(2)}
                            </span>
                            <span>Phút</span>
                          </p>
                        </TableCell>
                        <TableCell align="center">
                          <span className="text-xl font-bold">
                            {user.total_login}
                          </span>
                        </TableCell>
                        <TableCell align="right">
                          {JSON.parse(user.devices).map((device) => (
                            <p className="my-3">{device.device}</p>
                          ))}
                        </TableCell>
                      </TableRow>
                    ))}
                  {(!onlineUser || onlineUser.data.length == 0) && (
                    <TableRow>
                      <TableCell colSpan="8">
                        <span className="block w-full text-red-500 text-center font-semibold">
                          Không có dữ liệu
                        </span>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
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
      </LayoutAdmin>
    </>
  );
};

export default Dashboard;
