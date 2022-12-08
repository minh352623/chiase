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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingAdmin from "../../../components/LoadingAdmin";

const ListGroup = () => {
  const navigate = useNavigate();

  const [groups, setGroup] = React.useState();
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const getListUser = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: "/auth/admin/group?page=" + page + "&keyword=" + query,
      });
      if (response.status == 200) {
        console.log(response);
        setGroup(response.data);
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
          try {
            const response = await axios({
              method: "DELETE",
              url: "/auth/admin/group/" + id,
            });
            console.log(response);
            if (response.status === 200) {
              getListUser();
              //console.log(data);
              Swal.fire("Deleted!", "Your post has been deleted.", "success");
            }
          } catch (e) {
            console.log(e);
            if (e.response.status == 400) {
              toast.error(e.response.data, {
                position: "top-right",
                autoClose: 2000,
              });
            }
            if (e.response.status == 401) {
              navigate("/admin/login");
            }
          }
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
  const { per_page } = groups || [];
  //   //console.log(per_page);
  React.useEffect(() => {
    if (!groups || !groups.count) return;

    groups && setPageCount(Math.ceil(groups.count / per_page));
  }, [itemOffset, groups]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * per_page) % groups.count;
    setItemOffset(newOffset);
    setPage(event.selected + 1);
  };
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  //end phan trang

  //seaerch
  const [query, setQuery] = useState("");
  const handleSearch = lodash.debounce((e) => {
    setQuery(e.target.value);
  }, 700);
  //
  React.useEffect(() => {
    getListUser();
  }, [page, query]);
  return (
    <LayoutAdmin>
      <h2 className="uppercase text-center mb-3">list group</h2>
      <div className="flex items-center justify-between my-2">
        <div>
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="Search name group..."
              onChange={handleSearch}
            />
          </form>
        </div>
        <Link
          className="px-4 py-2 border-2 rounded-lg font-semibold no-underline hover:bg-blue-500 transition-all hover:text-slate-50  border-blue-500"
          to="/admin/groupuser/create"
        >
          Add Group
        </Link>
      </div>
      {loading && <LoadingAdmin></LoadingAdmin>}
      {!loading && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Stt</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Permission</TableCell>
                  <TableCell align="right">CreatedAt</TableCell>
                  <TableCell align="right">Edit</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groups?.rows &&
                  groups?.rows.map((group, index) => (
                    <TableRow
                      key={group.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="right">{group.name}</TableCell>
                      <TableCell align="right">
                        <span className="px-4 py-3 bg-blue-500 rounded-lg text-slate-50 cursor-pointer">
                          Permission
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        {moment(group.createdAt)
                          .tz("Asia/Bangkok")
                          .format("DD/MM/YYYY h:mm:ss A")}
                      </TableCell>
                      <TableCell align="right">
                        <Link
                          to={`/admin/groupuser/${group.id}`}
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
                            onClick={() => handleDelete(group.id)}
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
                {!groups?.rows ||
                  (groups?.rows?.length <= 0 && (
                    <TableRow>
                      <TableCell colSpan="6">
                        <span className="block w-full text-red-500 text-center font-semibold">
                          Không có dữ liệu
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
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

export default ListGroup;
