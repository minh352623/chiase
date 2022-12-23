import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardReport from "../../../components/CardReport";
import LoadingAdmin from "../../../components/LoadingAdmin";
import LayoutAdmin from "../../../layouts/LayoutAdmin";
import lodash from "lodash";
import ReactPaginate from "react-paginate";
import { handleFetchNotiReport } from "../../../store/reducers/userReducer";

const ListReportPost = ({ socket }) => {
  const navigate = useNavigate();
  const [reports, setReports] = useState();
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const fetchListReport = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: "auth/report/?status=" + status + "&keyword=" + query,
      });
      if (response.status === 200) {
        setLoading(false);

        console.log(response);
        setReports(response.data);
      }
    } catch (e) {
      setLoading(false);

      if (e.response.status == 401) {
        navigate("/admin/login");
      }
      console.log(e);
    }
  };
  useEffect(() => {
    fetchListReport();
  }, [query, status]);

  const handleSearch = lodash.debounce((e) => {
    setQuery(e.target.value);
  }, 700);
  const [loadingBrowse, setLoadingBrowse] = useState(false);
  const handleBrowseReport = async (item, statusDelete) => {
    try {
      console.log(item);
      setLoadingBrowse(true);
      const repsonse = await axios({
        method: "PATCH",
        url: "auth/report",
        data: {
          post_id: item?.id,
          post_share_id: item?.share_post_id,
          user_id: item.user_id,
          text: "Bài viết của bạn đã vi phạm tiêu chuẩn cộng đồng, Chúng tôi đã xóa bài viết của bạn!",
          avatar: user?.avatar,
          statusDelete,
        },
      });
      if (repsonse.status === 200) {
        console.log(repsonse);
        if (statusDelete == 1) {
          socket?.emit("browserReport", {
            ownPost: item.user_id,
            text: "Bài viết của bạn đã vi phạm tiêu chuẩn cộng đồng, Chúng tôi đã xóa bài viết của bạn!",
          });
        }
        setLoadingBrowse(false);

        dispatch(handleFetchNotiReport());

        fetchListReport();
        return repsonse.data;
      }
    } catch (e) {
      setLoadingBrowse(false);

      if (e.response.status == 401) {
        navigate("/admin/login");
      }
      console.log(e);
    }
  };
  return (
    <LayoutAdmin socket={socket}>
      {loadingBrowse && (
        <div className="fixed flex items-center justify-center inset-0 bg-[rgba(255,255,255,0.7)] z-10">
          Đang xử lý
        </div>
      )}
      <h2 className="text-center">Report Post</h2>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <span
            onClick={() => setStatus(0)}
            className={`px-4 py-2 ${
              status == 0 ? "bg-blue-400 text-white" : ""
            } rounded-lg  cursor-pointer  border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all `}
          >
            Chưa duyệt
          </span>
          <span
            onClick={() => setStatus(1)}
            className={`px-4 py-2 ${
              status == 1 ? "bg-blue-400 text-white" : ""
            } rounded-lg  cursor-pointer border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all `}
          >
            Đã duyệt
          </span>
        </div>
      </div>

      <div className="flex-1 w-3/4 mt-3">
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

      <div className="grid grid-cols-12 gap-3 my-3">
        {loading && (
          <div className="flex justify-center">
            <LoadingAdmin></LoadingAdmin>
          </div>
        )}
        {!loading &&
          reports?.length > 0 &&
          reports
            ?.sort(
              (a, b) => -(a.report_post_data.length - b.report_post_data.length)
            )
            .map((report) => (
              <CardReport
                status={status}
                handleBrowseReport={handleBrowseReport}
                key={report.id}
                user={user}
                report={report}
              ></CardReport>
            ))}
      </div>
      {reports?.length <= 0 && (
        <div className="text-red-500 block">Không có dữ liệu</div>
      )}
    </LayoutAdmin>
  );
};

export default ListReportPost;
