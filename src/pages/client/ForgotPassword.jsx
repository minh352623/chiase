import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoadingAdmin from "../../components/LoadingAdmin";
import { Link } from "react-router-dom";
const schema = yup.object({
  email: yup
    .string()
    .required("Email bắt buộc phải nhập")
    .email("Email không hợp lệ"),
});

const ForgotPassword = () => {
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
    if (localStorage.getItem("timeSendMail")) {
      const time =
        (new Date() - new Date(localStorage.getItem("timeSendMail"))) / 1000;
      console.log(time > 1);
      if (+time < 120) {
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
        url: "auth/admin/user/forgotPassword",
        data: {
          email: values.email,
        },
      });
      if (response.status === 201) {
        localStorage.setItem("timeSendMail", new Date());
        setLoading(false);
        Swal.fire({
          title: "Success",
          text: "Đã gửi mail xác nhận! Vui lòng kiểm tra email để xác nhận!",
          icon: "success",
        });
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: "Hệ thống gặp sự cố vui lòng thử lại sau!",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
      });
    }
  };
  return (
    <div className="container bg_anima  flex items-center h-screen justify-center">
      <div className="w-[500px] h-fit m-auto shadow_noti bg-white rounded-lg">
        <p className="w-full bg-blue-500 px-3 py-2 text-white font-bold rounded-t-lg">
          Quên mật khẩu?
        </p>
        <div className="px-3 py-2">
          <form onSubmit={handleSubmit(handleSendMail)} action="">
            <div>
              <p className="m-0">
                <label htmlFor="" className="font-bold text-black">
                  Email
                </label>
              </p>
              <input
                type="text"
                name="email"
                {...register("email")}
                className="border-2 w-full px-3 py-2 rounded-xl text-black border-blue-500"
                placeholder="Nhập email của bạn"
              />
              {errors?.email && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex justify-between px-3 my-3">
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
                  Gửi yêu cầu
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
