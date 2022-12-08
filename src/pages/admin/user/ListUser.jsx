import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LayoutAdmin from "../../../layouts/LayoutAdmin";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment-timezone";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import lodash from "lodash";
import { useState } from "react";
import LoadingAdmin from "../../../components/LoadingAdmin";

const Listuser = () => {
  const navigate = useNavigate();
  //${
  //gender > -1 ? `&gender=${gender}` : ""
  //}
  const [users, setUsers] = React.useState();
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const getListUser = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: `/auth/admin/user?page=${page}&keyword=${query}`,
        // headers: {
        //   Accept: "application/json;charset=UTF-8",
        // },
      });
      if (response.status == 200) {
        console.log(response);
        setUsers(response.data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);

      //call refresh token
      //token expired -> redirect login
      if (err.response.status == 401) {
        navigate("/admin/login");
      }
      console.log(err);
    }
  };
  const handleDelete = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const data = await axios({
            method: "DELETE",
            url: "/auth/admin/user/" + id,
          });
          getListUser();
          //console.log(data);
          Swal.fire("Deleted!", "Your post has been deleted.", "success");
        }
      });
    } catch (err) {
      if (err.response.status == 401) {
        navigate("/admin/login");
      }
      console.log(err);
    }
  };
  //phan trang
  const [pageCount, setPageCount] = React.useState(0);
  const [itemOffset, setItemOffset] = React.useState(0);
  const { per_page } = users || [];
  //   //console.log(per_page);
  React.useEffect(() => {
    if (!users || !users.count) return;

    users && setPageCount(Math.ceil(users.count / per_page));
  }, [itemOffset, users]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * per_page) % users.count;
    setItemOffset(newOffset);
    setPage(event.selected + 1);
  };

  //end phan trang

  //seaerch
  const [query, setQuery] = useState("");
  const handleSearch = lodash.debounce((e) => {
    setQuery(e.target.value);
  }, 700);
  const [gender, setGender] = useState(-1);
  //
  React.useEffect(() => {
    getListUser();
  }, [page, query, gender]);
  return (
    <LayoutAdmin>
      <h2 className="uppercase text-center mb-3">list User</h2>
      <div className="flex items-center justify-between my-2 gap-4">
        <div className="flex-1 w-3/4">
          <form>
            <div className="flex gap-3">
              <div className="w-1/5">
                <select name="" id="" className="form-control w-fit">
                  <option value="0">Select Role</option>
                  <option value="1">admin</option>
                </select>
              </div>
              <div className="w-1/5">
                <select
                  onChange={(e) => setGender(e.target.value)}
                  name=""
                  id=""
                  className="form-control"
                >
                  <option value="-1">Select Gender</option>
                  <option value="0">Male</option>
                  <option value="1">Female</option>
                </select>
              </div>
              <div className="w-2/5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search info user..."
                  onChange={handleSearch}
                />
              </div>
            </div>
          </form>
        </div>
        <Link
          className="px-4 py-2 border-2 rounded-lg font-semibold no-underline hover:bg-blue-500 transition-all hover:text-slate-50  border-blue-500"
          to="/admin/user/create"
        >
          Add User
        </Link>
      </div>
      {loading && <LoadingAdmin></LoadingAdmin>}
      {!loading && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="w-[6%]">Stt</TableCell>
                  <TableCell align="left" className="w-[30%]">
                    Info
                  </TableCell>
                  <TableCell align="right" className="w-[12%]">
                    Avatar
                  </TableCell>
                  <TableCell align="right">Gender</TableCell>
                  <TableCell align="right">Role</TableCell>
                  <TableCell align="right" className="w-[18%]">
                    CreatedAt
                  </TableCell>
                  <TableCell align="right" className="w-[7%]">
                    Edit
                  </TableCell>
                  <TableCell align="right" className="w-[7%]">
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.rows &&
                  users?.rows.map((user, index) => (
                    <TableRow
                      key={user.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                            {user.firstName + " " + user.lastName}
                          </span>
                        </p>
                        <p>
                          <span className="italic text-gray-600 font-semibold">
                            Email:{" "}
                          </span>
                          <span className="font-semibold">{user.email}</span>
                        </p>
                        <p>
                          <span className="italic text-gray-600 font-semibold">
                            Address:{" "}
                          </span>
                          <span className="font-semibold">{user.address}</span>
                        </p>
                        <p>
                          <span className="italic text-gray-600 font-semibold">
                            Phone:{" "}
                          </span>
                          <span className="font-semibold"> {user.phone}</span>
                        </p>
                      </TableCell>
                      <TableCell align="right">
                        <img
                          src={
                            user.avatar ? user.avatar : "../undraw_profile.svg"
                          }
                          className="rounded-full"
                          alt=""
                        />
                      </TableCell>
                      <TableCell align="right">
                        <span className="font-bold text-green-500 text-lg">
                          {user.gender == 1 ? "Female" : "Male"}
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        <span className="font-bold text-yellow-500 text-lg">
                          {user.group_data.name}
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        {moment(user.createdAt)
                          .tz("Asia/Bangkok")
                          .format("DD/MM/YYYY h:mm:ss A")}
                      </TableCell>
                      <TableCell align="right">
                        <Link
                          to={`/admin/user/${user.id}`}
                          className="text-end flex justify-end"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-10 h-10 rounded-lg text-slate-50 cursor-pointer hover:scale-110 transition-all p-2 bg-yellow-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <span className="flex justify-end">
                          <svg
                            onClick={() => handleDelete(user.id)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-10 h-10 rounded-lg text-slate-50 cursor-pointer hover:scale-110 transition-all p-2 bg-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                {(!users || users.rows.length == 0) && (
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
  );
};

export default Listuser;
