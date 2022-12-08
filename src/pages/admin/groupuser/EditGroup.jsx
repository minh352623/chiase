import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../../layouts/LayoutAdmin";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingAdmin from "../../../components/LoadingAdmin";
const schema = yup.object({
  name: yup.string().min(2, "Group Name less than 2 characters"),
});
const EditGroup = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState();
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const FecthGroup = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: "/auth/admin/group/" + id,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (response.status == 200) {
        console.log(response);
        setLoading(false);
        setGroup(response.data);
      }
    } catch (err) {
      if (err.response.status == 401) {
        navigate("/admin/login");
      }
      console.log(err);
      setLoading(false);
    }
  };
  const updateGroup = async (values) => {
    if (!isValid) return;

    console.log(values);
    try {
      const response = await axios({
        method: "patch",
        url: "/auth/admin/group/" + id,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(values),
      });
      if (response.status === 200) {
        console.log(response);
        setMessage(response.data);
      }
    } catch (e) {
      console.log(e);
      if (err.response.status == 401) {
        navigate("/admin/login");
      }
    }
  };
  useEffect(() => {
    FecthGroup();
  }, []);
  return (
    <LayoutAdmin>
      <div className="my-3">
        <h1 className="text-center">Update Group</h1>
        {message && (
          <h4 className="bg-green-400 rounded-lg text-center text-slate-50 p-2 font-semibold ">
            {message}
          </h4>
        )}
        {loading && <LoadingAdmin></LoadingAdmin>}
        {!loading && group && (
          <form onSubmit={handleSubmit(updateGroup)}>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12">
                <div className="form-group">
                  <label htmlFor="name">Group Name</label>
                  <input
                    type="text"
                    className="form-control w-full"
                    id="name"
                    {...register("name")}
                    defaultValue={group.name}
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
                Update Group
              </button>
            </div>
          </form>
        )}
      </div>
    </LayoutAdmin>
  );
};

export default EditGroup;
