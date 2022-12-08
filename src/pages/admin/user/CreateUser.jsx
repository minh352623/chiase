import React from "react";
import LayoutAdmin from "../../../layouts/LayoutAdmin";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object({
  firstname: yup.string().min(2, "FirstName less than 2 characters"),
  lastname: yup.string().min(2, "LastName less than 2 characters"),
  email: yup.string().required("Email required").email("Email invalid"),
  phone: yup.string().required("Email required").email("Email invalid"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .max(10, "Phone number must be small 10 characters long"),
  password: yup
    .string()
    .required("Password required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must have 8 digits and at least 1 uppercase letter, 1 lowercase letter, 1 special character, 1 number"
    ),
  confirm_password: yup
    .string()
    .required("Confirm Password required")
    .oneOf([yup.ref("password")], "Password not same"),
  address: yup.string().min(8, "Address less than 8 characters"),
});
const CreateUser = () => {
  const navigate = useNavigate();
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
  const createUser = async (values) => {
    if (!isValid) return;

    console.log(avatar);
    let formData = new FormData();
    formData.append("avatar", avatar[0]);
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("phone", values.phone);
    formData.append("address", values.address);
    formData.append("gender", values.gender);
    formData.append("role", values.role);
    try {
      setLoading(true);
      const response = await axios({
        method: "post",
        url: "/auth/admin/user",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      if (response.status === 200) {
        navigate("/admin/user");
        console.log(response);
        reset();
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);

      console.log(e);
      if (e.response.status == 401) {
        navigate("/admin/login");
      }
    }
  };
  const [groups, setGroup] = React.useState();

  const FetchRole = async () => {
    try {
      const response = await axios({
        url: "/auth/admin/group/getAll",
      });
      if (response.status == 200) {
        console.log(response);
        setGroup(response.data);
      }
    } catch (err) {
      //call refresh token
      //token expired -> redirect login
      if (err.response.status == 401) {
        navigate("/admin/login");
      }
      console.log(err);
    }
  };
  useEffect(() => {
    FetchRole();
  }, []);
  const showImg = useRef();
  const [avatar, setAvatar] = useState("");
  const showImage = (e) => {
    const [file] = e.target.files;
    setAvatar(e.target.files);
    if (file) {
      showImg.current.src = URL.createObjectURL(file);
    }
  };
  return (
    <LayoutAdmin>
      <div className="my-3">
        <h1 className="text-center">Create User</h1>
        <form onSubmit={handleSubmit(createUser)}>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-3">
              <div className="form-group">
                <label htmlFor="avatar">Avatar</label>
                <input
                  onChange={(e) => showImage(e)}
                  type="file"
                  className={`form-control w-full invisible`}
                  id="showimg"
                  placeholder="Enter your avatar"
                />
                <label htmlFor="showimg">
                  <img
                    className="w-4/5 mt-2 rounded-full cursor-pointer"
                    ref={showImg}
                    src="../../img-upload.png"
                    alt=""
                  />
                </label>
              </div>
            </div>
            <div className="col-span-9">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6">
                  <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input
                      type="text"
                      className={`form-control w-full`}
                      id="firstname"
                      {...register("firstname")}
                      placeholder="Enter your FirstName"
                    />
                    {errors?.firstname && (
                      <p className="text-red-500 mt-1 text-sm">
                        {errors.firstname.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                      type="text"
                      className="form-control w-full"
                      id="lastname"
                      {...register("lastname")}
                      placeholder="Enter your LastName"
                    />
                    {errors?.lastname && (
                      <p className="text-red-500 mt-1 text-sm">
                        {errors.lastname.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="form-group">
                    <label htmlFor="name">Email</label>
                    <input
                      type="text"
                      className="form-control w-full"
                      id="email"
                      {...register("email")}
                      placeholder="Enter your email address"
                    />
                    {errors?.email && (
                      <p className="text-red-500 mt-1 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      className="form-control w-full"
                      id="phone"
                      {...register("phone")}
                      placeholder="Enter phone number"
                    />
                    {errors?.phone && (
                      <p className="text-red-500 mt-1 text-sm">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control w-full"
                      id="password"
                      {...register("password")}
                      placeholder="Enter your password"
                    />
                    {errors?.password && (
                      <p className="text-red-500 mt-1 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="form-group">
                    <label htmlFor="password">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control w-full"
                      id="confirm_password"
                      {...register("confirm_password")}
                      placeholder="Enter your confirm_password"
                    />
                    {errors?.confirm_password && (
                      <p className="text-red-500 mt-1 text-sm">
                        {errors.confirm_password.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="form-group">
                    <label htmlFor="lastname">Address</label>
                    <input
                      type="text"
                      className="form-control w-full"
                      id="address"
                      {...register("address")}
                      placeholder="Enter your address"
                    />
                    {errors?.address && (
                      <p className="text-red-500 mt-1 text-sm">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="form-group">
                    <label htmlFor="lastname">Sex</label>
                    <select {...register("gender")} className="form-control">
                      <option value="0" selected>
                        Male
                      </option>
                      <option value="1">FeMale</option>
                    </select>
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="form-group">
                    <label htmlFor="lastname">Role</label>
                    <select {...register("role")} className="form-control">
                      {groups &&
                        groups.map((group, index) => (
                          <option key={group.id} value={group.id}>
                            {group.name}
                          </option>
                        ))}
                    </select>

                    {errors?.role && (
                      <p className="text-red-500 mt-1 text-sm">
                        {errors.role.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 w-[200px] rounded-lg text-slate-50 bg-blue-500"
                >
                  {loading ? "Processing....." : "Add User"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </LayoutAdmin>
  );
};

export default CreateUser;
