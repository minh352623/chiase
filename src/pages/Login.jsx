import React, { useState } from "react";
import "../css/register.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/reducers/authReducer";
import Swal from "sweetalert2";

const schema = yup.object({
  email: yup
    .string()
    .required("Email bắt buộc phải nhập")
    .email("Email không hợp lệ"),
  password: yup.string().required("Password bắt buộc phải nhập"),
});

const Login = () => {
  const { faceioInstance } = useSelector((state) => state.user);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const submitLogin = async (values) => {
    if (!isValid) return;

    try {
      setLoading(true);
      const response = await axios({
        method: "post",
        url: "/auth/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(values),
      });
      if (response.status === 200) {
        setError("");

        console.log(response);
        const accessToken = response.data.accessToken;
        localStorage.setItem("access_token", accessToken);
        // //decode lay thong tin payload
        var decodedPayload = jwt_decode(accessToken).dataValues;
        console.log(decodedPayload);
        dispatch(setUser(decodedPayload));
        window.location.href = "/home";

        reset();
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);

      // setError(e.response.data);
      console.log(e);
    }
  };
  const google = () => {
    window.location.href = "http://localhost:8080/api/auth/google";
  };

  // khuôn mặt

  //xác thực gương mặt
  const faceSignIn = async () => {
    try {
      console.log(faceioInstance);
      const userData = await faceioInstance.authenticate({
        locale: "auto",
      });
      console.log(userData);
      console.log("Unique Facial ID: ", userData.facialId);
      console.log("PayLoad: ", userData.payload);

      try {
        let response = await axios({
          method: "POST",
          url: "/auth/faceIDLogin",
          data: userData.payload,
        });
        if (response.status === 200) {
          console.log(response);
          const accessToken = response.data.accessToken;
          localStorage.setItem("access_token", accessToken);
          // //decode lay thong tin payload
          var decodedPayload = jwt_decode(accessToken).dataValues;
          console.log(decodedPayload);
          dispatch(setUser(decodedPayload));
          window.location.href = "/home";
        }
      } catch (err) {
        console.log(err);
      }
    } catch (errorCode) {
      console.log(errorCode);
      handleError(errorCode);
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
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      {error && (
                        <p className="text-red-400 px-3 py-2 rounded-sm mb-3 bg-red-200">
                          {error}
                        </p>
                      )}
                      <form
                        onSubmit={handleSubmit(submitLogin)}
                        className="user"
                      >
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control form-control-user"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                            {...register("email")}
                          />
                          {errors?.email && (
                            <p className="text-red-500 mt-1 text-sm">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Password"
                            {...register("password")}
                          />
                          {errors?.password && (
                            <p className="text-red-500 mt-1 text-sm">
                              {errors.password.message}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <button
                          type="submit"
                          href="index.html"
                          className="btn mb-3 btn-primary btn-user btn-block bg-primary"
                        >
                          {loading ? "Đang xử lý..." : "Login"}
                        </button>
                        <hr />
                        <div className="py-3">
                          <p
                            onClick={faceSignIn}
                            className="flex items-center cursor-pointer justify-center w-full rounded-full bg-gray-600 py-1 text-white"
                          >
                            <img
                              src="./face-id.png"
                              className="w-6 h-6"
                              alt=""
                            />{" "}
                            Login with FaceId
                          </p>
                          <p
                            onClick={google}
                            className="flex items-center cursor-pointer justify-center w-full rounded-full bg-red-500 py-1 text-white"
                          >
                            <i className="fab fa-google fa-fw"></i> Login with
                            Google
                          </p>
                          <p
                            onClick={() => {
                              window.location.href =
                                "http://localhost:8080/api/auth/facebook";
                            }}
                            className="flex items-center cursor-pointer justify-center w-full rounded-full bg-blue-500 py-1 text-white"
                          >
                            <i className="fab fa-facebook-f fa-fw"></i> Login
                            with Facebook
                          </p>
                          <p
                            onClick={() => {
                              window.location.href =
                                "http://localhost:8080/api/auth/github";
                            }}
                            className="flex items-center justify-center cursor-pointer w-full rounded-full bg-black py-1 text-white"
                          >
                            <i class="fa-brands fa-github "></i> Login with
                            Github
                          </p>
                        </div>
                      </form>
                      <hr />
                      <div className="text-center">
                        <Link
                          to="/forgot-password"
                          className="small"
                          href="forgot-password.html"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="text-center">
                        <Link
                          to="/register"
                          className="small"
                          href="register.html"
                        >
                          Create an Account!
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
