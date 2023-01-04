import React, { useState } from "react";
import "../css/register.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
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
                          <a
                            href="index.html"
                            className="btn btn-google btn-user btn-block"
                          >
                            <i className="fab fa-google fa-fw"></i> Login with
                            Google
                          </a>
                          <a
                            href="index.html"
                            className="btn btn-facebook btn-user btn-block"
                          >
                            <i className="fab fa-facebook-f fa-fw"></i> Login
                            with Facebook
                          </a>
                        </div>
                      </form>
                      <hr />
                      <div className="text-center">
                        <a className="small" href="forgot-password.html">
                          Forgot Password?
                        </a>
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
