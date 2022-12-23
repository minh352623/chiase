import React from "react";
import { useState } from "react";
import { CaculateTime } from "../trait/CaculateTime";
import Swal from "sweetalert2";

const CardReport = ({ report, user, handleBrowseReport, status }) => {
  console.log(report.createdAt);
  const [showReport, setShowreport] = useState(1);
  const browseReport = async (item, statusDelete) => {
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
          const repsonse = await handleBrowseReport(item, statusDelete);

          //console.log(data);
          Swal.fire("Duyệt!", "Duyệt báo cáo thành công.", "success");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="p-3 rounded-xl shadow_noti bg-white col-span-4">
      <div className="grid grid-cols-12">
        <div className="col-span-12  ">
          <div className="flex px-3 justify-between  ">
            <div className="flex gap-3">
              <span className="w-[45px]">
                <img
                  className="w-full rounded-full"
                  src={
                    report.user_data.avatar
                      ? report.user_data.avatar
                      : "../undraw_profile.svg"
                  }
                  alt=""
                />
              </span>
              <p className="font-bold text-black flex flex-col">
                <span>
                  {report.user_data.firstName + " " + report.user_data.lastName}
                </span>
                <span className="text-gray-600 m-0">
                  {CaculateTime(report.createdAt)}
                </span>
              </p>
            </div>
            <div className="m-0 block relative text-2xl leading-none   font-bold ">
              <span className="cursor-pointer bg-red-500 text-white p-1 h-[30px] w-[30px] flex items-center justify-center rounded-full  transition-all">
                {report.report_post_data?.length}
              </span>
            </div>
          </div>
          <p className="px-3 text-black">{report.content}</p>
          {report.post_data_two && report.share_post_id ? (
            <div className="mt-3 border rounded-xl mx-3 p-3 ">
              <div className="grid grid-cols-12 gap-2">
                {report.post_data_two?.file_data.length > 1 ? (
                  report.post_data_two?.file_data.map((item) => (
                    <div className="col-span-6">
                      <img className="w-full" src={item?.link} alt="" />
                    </div>
                  ))
                ) : (
                  <div className="col-span-12">
                    <img
                      className="w-full"
                      src={report.post_data_two?.file_data[0]?.link}
                      alt=""
                    />
                  </div>
                )}
              </div>
              <div className="share_content px-3 mt-3">
                <div className="flex  gap-3">
                  <span className="w-[45px]">
                    <img
                      className="w-full rounded-full"
                      src={
                        report.post_data_two.user_data.avatar
                          ? report.post_data_two.user_data.avatar
                          : "../undraw_profile.svg"
                      }
                      alt=""
                    />
                  </span>
                  <p className="font-bold text-black flex flex-col">
                    <span>
                      {report.post_data_two.user_data.firstName +
                        " " +
                        report.post_data_two.user_data.lastName}
                    </span>
                    <span className="text-gray-600 m-0">
                      {CaculateTime(report.post_data_two.createdAt)}
                    </span>
                  </p>
                </div>
                <div className="text-black fonr-bold ">
                  {report.post_data_two.content}
                </div>
              </div>
            </div>
          ) : !report.post_data_two && report.share_post_id ? (
            <div className="mt-3 border rounded-xl mx-3 p-3 bg-gray-400 ">
              <p className="text-bold text-black font-semibold">
                Bài viết này đã bị xóa hoặc không tồn tại
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-2">
              {report?.file_data &&
                report?.file_data.length > 0 &&
                report.file_data?.map((i) => {
                  if (i.link) {
                    if (report.file_data.length < 2) {
                      return (
                        <div key={i.id} className="col-span-12">
                          {i.link?.includes("video") ? (
                            <video
                              className="w-full object-cover h-[300px]"
                              src={i.link}
                              controls
                            ></video>
                          ) : (
                            <img
                              src={i.link}
                              className="w-full object-cover h-[300px]"
                              alt=""
                            />
                          )}
                        </div>
                      );
                    } else {
                      return (
                        <div key={i.id} className="col-span-6">
                          {i.link.includes("video") ? (
                            <video
                              className="w-full object-cover h-[300px]"
                              src={i.link}
                              controls
                            ></video>
                          ) : (
                            <img
                              src={i.link}
                              className="w-full object-cover h-[300px]"
                              alt=""
                            />
                          )}
                        </div>
                      );
                    }
                  }
                })}
            </div>
          )}
          <div className="border-b-2 p-2 info_post flex justify-between px-3">
            {report.like_count >= 0 && (
              <div className="flex gap-1 items-center">
                <span>
                  <img src="../heart_full.png" className="w-[25px]" alt="" />
                </span>
                <span className="font-bold">{report.like_count} Tym</span>
              </div>
            )}
            {report.comment_count >= 0 && (
              <div className="flex gap-1 items-center">
                <span
                  onClick={() => {
                    setShowFormComment((showFormComment) => !showFormComment);
                  }}
                  className="font-bold hover:underline cursor-pointer"
                >
                  {report.comment_count} Bình luận
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg text-black mt-2">
              Thông tin về danh sách báo cáo
            </h2>
            {report.report_post_data.slice(0, showReport).map((item) => (
              <div className="bg-gray-200 p-2">
                <p className="flex gap-3 m-0 item-center">
                  <span>
                    <img
                      src={
                        item.user_data?.avatar
                          ? item.user_data.avatar
                          : "../undraw_profile.svg"
                      }
                      className="w-[30px] rounded-full"
                      alt=""
                    />
                  </span>
                  <span className="text-black dont-semibold">
                    {item.user_data.firstName + " " + item.user_data.lastName}
                  </span>
                </p>
                <p className="m-0 font-bold my-2">{item.option_data.text}</p>
              </div>
            ))}
            {report.report_post_data.length > showReport && showReport > 0 && (
              <p
                onClick={() =>
                  setShowreport((showReport) => {
                    let showReportCurent = showReport + 2;

                    return showReportCurent;
                  })
                }
                className="font-bold m-0 cursor-pointer hover:underline"
              >
                Xem thêm báo cáo
              </p>
            )}
            {(showReport < 0 ||
              (showReport >= report.report_post_data.length &&
                showReport > 1)) &&
              report.report_post_data.length > 0 && (
                <p
                  onClick={() => setShowreport(1)}
                  className="font-bold m-0 cursor-pointer hover:underline"
                >
                  Ẩn bớt báo cáo
                </p>
              )}
          </div>
          {status === 0 && (
            <>
              <div className="flex justify-between gap-3 my-2">
                <span
                  onClick={() => browseReport(report, 0)}
                  className="p-2  text-center bg-blue-500 text-white rounded-lg fonr-semibold cursor-pointer hover:scale-105 transition-all"
                >
                  Duyệt (Bài viết bình thường)
                </span>
                <span
                  onClick={() => browseReport(report, 1)}
                  className="p-2  text-center bg-red-500 text-white rounded-lg fonr-semibold cursor-pointer hover:scale-105 transition-all"
                >
                  Duyệt/Xóa (Bài viết ảnh hưởng đến mọi người)
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardReport;
