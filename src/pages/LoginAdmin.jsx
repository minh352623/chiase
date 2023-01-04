import React, { useState } from "react";
import "../css/adminlogin.css";
import jwt_decode from "jwt-decode";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/reducers/authReducer";
import Swal from "sweetalert2";

const schema = yup.object({
  email: yup
    .string()
    .required("Email bắt buộc phải nhập")
    .email("Email không hợp lệ"),
  // password: yup
  //   .string()
  //   .required("Mật khẩu bắt buộc phải nhập")
  //   .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //     "Mật khẩu phải 8 chữ số và ít nhất có 1 chữ hoa, 1 chữ thường, 1 kí tự đặt biệt,1 số"
  //   ),
});
const LoginAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const loginAdmin = async (values) => {
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
        if (decodedPayload.group_id == 1) {
          navigate("/admin/dashboard");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Bạn không có quyền truy cập ne!",
          });
          reset();
        }
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);

      setError(e.response.data);
      console.log(e);
    }
  };
  return (
    <div className="admin_login">
      <div className="card card-container">
        <img
          id="profile-img"
          className="profile-img-card"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        />
        <p id="profile-name" className="profile-name-card">
          Admin
        </p>
        {error && (
          <p className="text-red-500 my-1 p-1 text-start pl-3 rounded-lg bg-red-200">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit(loginAdmin)} className="form-signin">
          <span id="reauth-email" className="reauth-email"></span>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            autoFocus
            {...register("email")}
          />
          {errors?.email && (
            <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>
          )}
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            {...register("password")}
          />
          {errors?.password && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.password.message}
            </p>
          )}
          <button
            className="btn btn-lg btn-primary btn-block btn-signin"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
