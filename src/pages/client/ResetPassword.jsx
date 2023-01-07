import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoadingAdmin from "../../components/LoadingAdmin";
const schema = yup.object({});

const ResetPassword = () => {
  const search = useLocation().search;
  const tokenEmail = new URLSearchParams(search).get("token");
  const email = new URLSearchParams(search).get("email");

  //

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const [laoding, setLoading] = useState();
  const handleSendMail = async (values) => {
    console.log(values);
    if (!isValid) return;
    if (localStorage.getItem("timeChangePassword")) {
      const time =
        (new Date() - new Date(localStorage.getItem("timeChangePassword"))) /
        1000;
      if (time < 120) {
        Swal.fire({
          title: "Error!",
          text: "Vui lòng đợi 2 phút kể từ lần cuối yêu cầu!",
          icon: "error",
          showCancelButton: true,
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
        });
        return;
      }
    }
    console.log();
    // if( )
    try {
      setLoading(true);
      const response = await axios({
        method: "POST",
        url: "auth/admin/user/changePassword",
        data: {
          email: email,
          tokenEmail: tokenEmail,
          password: values.password,
        },
      });
      if (response.status === 201) {
        localStorage.setItem("timeChangePassword", new Date());
        setLoading(false);
        Swal.fire({
          title: "Success",
          text: "Đổi mật khẩu thành công! Bạn có thể đăng nhập ngay bây giờ!",
          icon: "success",
        });
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: e.response.data,
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
      });
    }
  };
  console.log(tokenEmail, email);
  return (
    <div className="container bg_anima  flex items-center h-screen justify-center">
      <div className="w-[500px] h-fit m-auto shadow_noti bg-white rounded-lg">
        <p className="w-full bg-blue-500 px-3 py-2 text-white font-bold rounded-t-lg">
          Đổi mật khẩu?
        </p>
        <div className="px-3 py-2">
          <form onSubmit={handleSubmit(handleSendMail)} action="">
            <div className="my-3">
              <p className="m-0">
                <label htmlFor="" className="font-bold text-black">
                  Email
                </label>
              </p>
              <input
                type="text"
                disabled
                name="email"
                defaultValue={email}
                // {...register("email")}
                className="border-2 w-full px-3 py-2 rounded-xl text-black bg-gray-500"
                placeholder="Nhập email của bạn"
              />
            </div>
            <div>
              <p className="m-0">
                <label htmlFor="" className="font-bold text-black">
                  Mật khẩu mới
                </label>
              </p>
              <input
                type="password"
                name="mật khẩu"
                {...register("password")}
                className="border-2 w-full px-3 py-2 rounded-xl text-black "
                placeholder="Nhập mật khẩu của bạn"
              />
            </div>
            <div className="flex justify-between item-center px-3 my-3">
              <Link
                className="bg-slate-600 flex items-center justify-center px-3 py-2 text-white rounded-xl"
                to="/login"
              >
                Đăng nhập
              </Link>
              {laoding && (
                <button className="px-3 py-2 bg-gray-400 text-white  font-bold rounded-xl">
                  <LoadingAdmin></LoadingAdmin>
                </button>
              )}
              {!laoding && (
                <button
                  type="submit"
                  className="px-3 py-2 bg-blue-400 text-white  font-bold rounded-xl"
                >
                  Đổi mật khẩu
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
