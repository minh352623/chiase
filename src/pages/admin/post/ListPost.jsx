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
const ListPost = ({ socket }) => {
  const navigate = useNavigate();
  //${
  //gender > -1 ? `&gender=${gender}` : ""
  //}
  const [query, setQuery] = useState("");

  const [posts, setPosts] = React.useState();
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const getListUser = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: `/auth/post?page=${page}&keyword=${query}`,
        // headers: {
        //   Accept: "application/json;charset=UTF-8",
        // },
      });
      if (response.status == 200) {
        console.log(response);
        setPosts(response.data);
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

  //phan trang
  const [pageCount, setPageCount] = React.useState(0);
  const [itemOffset, setItemOffset] = React.useState(0);
  const { per_page } = posts || [];
  //   //console.log(per_page);
  React.useEffect(() => {
    if (!posts || !posts.count) return;

    posts && setPageCount(Math.ceil(posts.count / per_page));
  }, [itemOffset, posts]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * per_page) % posts.count;
    setItemOffset(newOffset);
    setPage(event.selected + 1);
  };

  //end phan trang

  //seaerch
  const handleSearch = lodash.debounce((e) => {
    setQuery(e.target.value);
  }, 700);
  const [gender, setGender] = useState(-1);
  //
  React.useEffect(() => {
    getListUser();
  }, [page, query, gender]);

  return (
    <LayoutAdmin socket={socket}>
      <h2 className="uppercase text-center mb-3">list User</h2>
      <div className="flex items-center justify-between my-2 gap-4">
        <div className="flex-1 w-3/4">
          <form>
            <div className="flex gap-3">
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
      </div>
      {loading && <LoadingAdmin></LoadingAdmin>}
      {!loading && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ 8: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="w-[1%]">Stt</TableCell>
                  <TableCell align="left" className="w-[24%]">
                    Info
                  </TableCell>
                  <TableCell align="right" className="w-[5%]">
                    Avatar
                  </TableCell>
                  <TableCell align="right" className="w-[20%]">
                    Content
                  </TableCell>
                  <TableCell align="right" className="w-[5%]">
                    Share_Post_Id
                  </TableCell>
                  <TableCell align="right">File_upload</TableCell>
                  <TableCell align="right" className="w-[10%]">
                    Total Like
                  </TableCell>
                  <TableCell align="right" className="w-[11%]">
                    Total Comment
                  </TableCell>
                  <TableCell align="right" className="w-[10%]">
                    CreatedAt
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts?.data &&
                  posts?.data.map((post, index) => (
                    <TableRow
                      key={post.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {post?.id}
                      </TableCell>
                      <TableCell align="left">
                        <p className="text-sm">
                          <span className="italic text-gray-600 font-semibold">
                            Fullname:{" "}
                          </span>
                          <span className="font-semibold">
                            {post.user_data.firstName +
                              " " +
                              post.user_data.lastName}
                          </span>
                        </p>
                        <p className="text-sm">
                          <span className="italic text-gray-600 font-semibold">
                            Email:{" "}
                          </span>
                          <span className="font-semibold">
                            {post.user_data.email}
                          </span>
                        </p>
                        <p className="text-sm">
                          <span className="italic text-gray-600 font-semibold">
                            Address:{" "}
                          </span>
                          <span className="font-semibold">
                            {post.user_data.address}
                          </span>
                        </p>
                      </TableCell>
                      <TableCell align="right">
                        <img
                          src={
                            post.user_data.avatar
                              ? post.user_data.avatar
                              : "../undraw_profile.svg"
                          }
                          className="rounded-full"
                          alt=""
                        />
                      </TableCell>
                      <TableCell align="right">
                        <p className="hidden_show">{post.content}</p>
                      </TableCell>
                      <TableCell align="right">
                        {post?.share_post_id ? post?.share_post_id : "FALSE"}
                      </TableCell>
                      <TableCell align="right">
                        <p className="grid grid-cols-12 gap-1">
                          {post?.file_data &&
                            post.file_data.map((item) => {
                              return (
                                <div key={item.id} className="col-span-6">
                                  {item.link?.includes("video") ? (
                                    <video
                                      className="w-full object-cover h-full"
                                      src={item.link}
                                      controls
                                    ></video>
                                  ) : (
                                    <img
                                      src={item.link}
                                      className="w-full object-cover h-full"
                                      alt=""
                                    />
                                  )}
                                </div>
                              );
                            })}
                        </p>
                      </TableCell>
                      <TableCell align="right">
                        <p>{post?.like_count}</p>
                      </TableCell>
                      <TableCell align="right">
                        <p>{post?.comment_count}</p>
                      </TableCell>
                      <TableCell align="right">
                        {moment(post.createdAt)
                          .tz("Asia/Bangkok")
                          .format("DD/MM/YYYY h:mm:ss A")}
                      </TableCell>
                    </TableRow>
                  ))}
                {(!posts || posts.data.length == 0) && (
                  <TableRow>
                    <TableCell colSpan="9">
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

export default ListPost;
