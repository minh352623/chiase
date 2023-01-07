import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CaculateTime } from "../trait/CaculateTime";

const ContentLeft = ({ user, nofitycations }) => {
  console.log(nofitycations.notys);
  const { faceioInstance } = useSelector((state) => state.user);
  //đăng kí gương mặt
  const faceRegistration = async () => {
    if (user) {
      try {
        const userInfo = await faceioInstance.enroll({
          locale: "auto",
          payload: {
            email: user?.email,
            userId: user?.id,
            username: user?.firstName + " " + user?.lastName,
          },
        });
        console.log(userInfo);
        console.log("Unique Facial ID: ", userInfo.facialId);
        console.log("Enrollment Date: ", userInfo.timestamp);
        console.log("Gender: ", userInfo.details.gender);
        console.log("Age Approximation: ", userInfo.details.age);
      } catch (errorCode) {
        console.log(errorCode);
        handleError(errorCode);
      }
    }
  };

  const handleError = (errCode) => {
    // Log all possible error codes during user interaction..
    // Refer to: https://faceio.net/integration-guide#error-codes
    // for a detailed overview when these errors are triggered.
    // const fioErrCode={PERMISSION_REFUSED:1,NO_FACES_DETECTED:2,UNRECOGNIZED_FACE:3,MANY_FACES:4,PAD_ATTACK:5,FACE_MISMATCH:6,NETWORK_IO:7,WRONG_PIN_CODE:8,PROCESSING_ERR:9,UNAUTHORIZED:10,TERMS_NOT_ACCEPTED:11,UI_NOT_READY:12,SESSION_EXPIRED:13,TIMEOUT:14,TOO_MANY_REQUESTS:15,EMPTY_ORIGIN:16,FORBIDDDEN_ORIGIN:17,FORBIDDDEN_COUNTRY:18,UNIQUE_PIN_REQUIRED:19,SESSION_IN_PROGRESS:20},fioState={UI_READY:1,PERM_WAIT:2,PERM_REFUSED:3,PERM_GRANTED:4,REPLY_WAIT:5,PERM_PIN_WAIT:6,AUTH_FAILURE:7,AUTH_SUCCESS:8}
    switch (errCode) {
      case fioErrCode.PERMISSION_REFUSED:
        console.log("Access to the Camera stream was denied by the end user");
        break;
      case fioErrCode.NO_FACES_DETECTED:
        console.log(
          "No faces were detected during the enroll or authentication process"
        );
        break;
      case fioErrCode.UNRECOGNIZED_FACE:
        console.log("Unrecognized face on this application's Facial Index");
        break;
      case fioErrCode.MANY_FACES:
        console.log("Two or more faces were detected during the scan process");
        break;
      case fioErrCode.PAD_ATTACK:
        console.log(
          "Presentation (Spoof) Attack (PAD) detected during the scan process"
        );
        break;
      case fioErrCode.FACE_MISMATCH:
        console.log(
          "Calculated Facial Vectors of the user being enrolled do not matches"
        );
        break;
      case fioErrCode.WRONG_PIN_CODE:
        console.log("Wrong PIN code supplied by the user being authenticated");
        break;
      case fioErrCode.PROCESSING_ERR:
        console.log("Server side error");
        break;
      case fioErrCode.UNAUTHORIZED:
        console.log(
          "Your application is not allowed to perform the requested operation (eg. Invalid ID, Blocked, Paused, etc.). Refer to the FACEIO Console for additional information"
        );
        break;
      case fioErrCode.TERMS_NOT_ACCEPTED:
        console.log(
          "Terms & Conditions set out by FACEIO/host application rejected by the end user"
        );
        break;
      case fioErrCode.UI_NOT_READY:
        console.log(
          "The FACEIO Widget code could not be (or is being) injected onto the client DOM"
        );
        break;
      case fioErrCode.SESSION_EXPIRED:
        console.log(
          "Client session expired. The first promise was already fulfilled but the host application failed to act accordingly"
        );
        break;
      case fioErrCode.TIMEOUT:
        console.log(
          "Ongoing operation timed out (eg, Camera access permission, ToS accept delay, Face not yet detected, Server Reply, etc.)"
        );
        break;
      case fioErrCode.TOO_MANY_REQUESTS:
        console.log(
          "Widget instantiation requests exceeded for freemium applications. Does not apply for upgraded applications"
        );
        break;
      case fioErrCode.EMPTY_ORIGIN:
        console.log(
          "Origin or Referer HTTP request header is empty or missing"
        );
        break;
      case fioErrCode.FORBIDDDEN_ORIGIN:
        console.log("Domain origin is forbidden from instantiating fio.js");
        break;
      case fioErrCode.FORBIDDDEN_COUNTRY:
        console.log(
          "Country ISO-3166-1 Code is forbidden from instantiating fio.js"
        );
        break;
      case fioErrCode.SESSION_IN_PROGRESS:
        console.log(
          "Another authentication or enrollment session is in progress"
        );
        break;
      case fioErrCode.NETWORK_IO:
      default:
        console.log(
          "Error while establishing network connection with the target FACEIO processing node"
        );
        break;
    }
  };
  //end dk
  return (
    <div>
      {/* <div
            key={noti.id}
            className="p-2 hover:bg-gray-300 transition-all rounded-lg flex notis-center gap-3"
          >
            <span className=" block w-[20%] xl:w-[10%]">
              <img
                className="w-full  rounded-full"
                src={
                  noti?.user_data?.avatar
                    ? noti?.user_data?.avatar
                    : "./undraw_profile.svg"
                }
                alt=""
              />
            </span>
            <div className="flex flex-col gap-1   w-[80%]">
              <p className="m-0 css_dot  text-sm font-semibold text-black">
                {noti.text}
              </p>
              <span className="text-sm text-start text-blue-400 font-semibold">
                {CaculateTime(noti.createdAt)}
              </span>
            </div>
          </div>; */}
      <div className="flex flex-col">
        <Link
          to={`/profile/${user?.id}`}
          className="flex gap-3 no-underline items-center hover:bg-gray-300 px-2 py-3 rounded-lg cursor-pointer"
        >
          <span>
            <img
              className="w-[40px] rounded-full"
              src={user?.avatar ? user.avatar : "./undraw_profile.svg"}
              alt=""
            />
          </span>
          <span className="text-slate-900 font-bold">
            {user?.firstName + " " + user.lastName}
          </span>
        </Link>
        <Link
          to="/friends"
          className="flex gap-3 no-underline items-center hover:bg-gray-300 px-2 py-3 rounded-lg cursor-pointer"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-slate-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          </span>
          <span className="text-slate-900 font-bold">Bạn bè</span>
        </Link>
        <p
          onClick={() => faceRegistration()}
          className="flex gap-3 no-underline items-center hover:bg-gray-300 px-2 py-3 rounded-lg cursor-pointer font-bold text-black"
        >
          <span>
            <img className="w-8 h-8" src="../../face-recognition.png" alt="" />
          </span>
          <span>Đăng kí nhận dạng khuôn mặt</span>
        </p>
      </div>
      <div className="mt-3 shadow-sm p-3 rounded-2xl bg-white max-h-[50vh] h-[50vh] overflow-y-scroll content_center">
        <h5 className="text-black text-lg">Thông báo mới nhất</h5>
        {nofitycations.notys.map((noti) => {
          if (noti.read == 0)
            return (
              <div
                key={noti.id}
                className="p-2 my-1 texy-start hover:bg-gray-400 bg-gray-300 transition-all rounded-lg  flex items-center gap-3"
              >
                <span className="block w-[15%]">
                  <img
                    className="w-full block rounded-full"
                    src={noti?.avatar ? noti?.avatar : "./undraw_profile.svg"}
                    alt=""
                  />
                </span>
                <div className="flex flex-col gap-1 w-[90%]">
                  <span className="text-sm text-start font-semibold text-black">
                    {noti.text}
                  </span>
                  <div className="flex justify-between">
                    <span className="text-sm text-start text-blue-400 font-semibold">
                      {CaculateTime(noti.createdAt)}
                    </span>
                    <span className="p-2 inline-block w-[20px] h-[20px] text-end bg-blue-500 rounded-full"></span>
                  </div>
                </div>
              </div>
            );
          return (
            <div
              key={noti.id}
              className="p-2 my-1 hover:bg-gray-300 transition-all rounded-lg flex items-center gap-3"
            >
              <span className="block w-[15%]">
                <img
                  className="w-full rounded-full"
                  src={noti?.avatar ? noti?.avatar : "./undraw_profile.svg"}
                  alt=""
                />
              </span>
              <div className="flex flex-col gap-1 w-[90%] ">
                <span className="text-sm text-start font-semibold text-black">
                  {noti.text}
                </span>
                <span className="text-sm text-start text-blue-400 font-semibold">
                  {CaculateTime(noti.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
        {(nofitycations.length <= 0 || nofitycations?.noty_count <= 0) && (
          <div className="flex items-center justify-center">
            không có thông báo
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentLeft;
