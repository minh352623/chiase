import React from "react";
import LayoutAdmin from "../../../layouts/LayoutAdmin";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const schema = yup.object({
  name: yup.string().min(2, "Group Name less than 2 characters"),
});
const CreateUser = ({ socket }) => {
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
  const createGroup = async (values) => {
    if (!isValid) return;

    console.log(values);
    try {
      const response = await axios({
        method: "post",
        url: "/auth/admin/group",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(values),
      });
      if (response.status === 200) {
        navigate("/admin/groupuser");
      }
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        navigate("/admin/login");
      }
    }
    reset();
  };
  return (
    <LayoutAdmin socket={socket}>
      <div className="my-3">
        <h1 className="text-center">Create Group</h1>
        <form onSubmit={handleSubmit(createGroup)}>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12">
              <div className="form-group">
                <label htmlFor="name">Group Name</label>
                <input
                  type="text"
                  className="form-control w-full"
                  id="name"
                  {...register("name")}
                  placeholder="Name Group"
                />
                {errors?.name && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 w-[200px] rounded-lg text-slate-50 bg-blue-500"
            >
              Add Group
            </button>
          </div>
        </form>
      </div>
    </LayoutAdmin>
  );
};

export default CreateUser;
