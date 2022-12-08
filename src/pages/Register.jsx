import React from "react";
import "../css/register.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object({
  firstName: yup.string().min(2, "Họ user ít nhất 2 kí tự"),
  lastName: yup.string().min(2, "Tên user ít nhất 2 kí tự"),

  email: yup
    .string()
    .required("Email bắt buộc phải nhập")
    .email("Email không hợp lệ"),
  password: yup
    .string()
    .required("Mật khẩu bắt buộc phải nhập")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Mật khẩu phải 8 chữ số và ít nhất có 1 chữ hoa, 1 chữ thường, 1 kí tự đặt biệt,1 số"
    ),
  confirm_password: yup
    .string()
    .required("Nhập lại mật khẩu là bắt buộc")
    .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
});
const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const submitRegister = async (values) => {
    console.log(values);
    if (!isValid) return;

    try {
      const response = await axios({
        method: "post",
        url: "/auth/register",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(values),
      });
      console.log(response);
      if (response.status === 200) {
        console.log(response);
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="container w-3/4">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">
                      Create an Account!
                    </h1>
                  </div>
                  <form
                    onSubmit={handleSubmit(submitRegister)}
                    className="user"
                  >
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleFirstName"
                          placeholder="First Name"
                          {...register("firstName")}
                        />
                        {errors?.firstName && (
                          <p className="text-red-500 mt-1 text-sm">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleLastName"
                          placeholder="Last Name"
                          {...register("lastName")}
                        />
                        {errors?.lastName && (
                          <p className="text-red-500 mt-1 text-sm">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-user"
                        id="exampleInputEmail"
                        placeholder="Email Address"
                        {...register("email")}
                      />
                      {errors?.email && (
                        <p className="text-red-500 mt-1 text-sm">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
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
                      <div className="col-sm-6">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="exampleRepeatPassword"
                          placeholder="Repeat Password"
                          {...register("confirm_password")}
                        />
                        {errors?.confirm_password && (
                          <p className="text-red-500 mt-1 text-sm">
                            {errors.confirm_password.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary mb-3 btn-user btn-block bg-primary"
                    >
                      Register Account
                    </button>
                    <hr />
                    <div className="py-3">
                      <a
                        href="index.html"
                        className="btn btn-google btn-user btn-block"
                      >
                        <i className="fab fa-google fa-fw"></i> Register with
                        Google
                      </a>
                      <a
                        href="index.html"
                        className="btn btn-facebook btn-user btn-block"
                      >
                        <i className="fab fa-facebook-f fa-fw"></i> Register
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
                    <Link to="/login" className="small">
                      Already have an account? Login!
                    </Link>
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

export default Register;
