import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../../layouts/LayoutAdmin";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingAdmin from "../../../components/LoadingAdmin";
const schema = yup.object({
  name: yup.string().min(2, "Tên danh mục phải lớn hơn 2 kí tự"),
  cate: yup.string().required("Danh mục không được để trống!"),
});
const EditOptionCate = ({ socket }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const [cates, setCates] = useState();
  const getCateProfile = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: "/auth/admin/cate-profile/getAll",
      });
      if (response.status == 200) {
        console.log(response);
        setCates(response.data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);

      //call refresh token
      //token expired -> redirect login
      if (err.response.status == 401) {
        navigate("/admin/login");
      }
      console.log(err);
    }
  };
  useEffect(() => {
    getCateProfile();
  }, []);
  const FecthOption = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: "/auth/admin/option-profile/" + id,
      });
      if (response.status == 200) {
        console.log(response);
        setLoading(false);
        setValue("key", response.data.key);
        setValue("cate", response.data.cate_id);
      }
    } catch (err) {
      if (err.response.status == 401) {
        navigate("/admin/login");
      }
      console.log(err);
      setLoading(false);
    }
  };
  const updateOption = async (values) => {
    if (!isValid) return;

    console.log(values);
    try {
      const response = await axios({
        method: "patch",
        url: "/auth/admin/option-profile/" + id,

        data: values,
      });
      if (response.status === 200) {
        console.log(response);
        navigate("/admin/option-profile");

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
    FecthOption();
  }, []);
  return (
    <LayoutAdmin socket={socket}>
      <div className="my-3">
        <h1 className="text-center">Cập nhật danh mục</h1>
        {message && (
          <h4 className="bg-green-400 rounded-lg text-center text-slate-50 p-2 font-semibold ">
            {message}
          </h4>
        )}
        {loading && <LoadingAdmin></LoadingAdmin>}
        {!loading && (
          <form onSubmit={handleSubmit(updateOption)}>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12">
                <div className="form-group">
                  <label htmlFor="name">Key option</label>
                  <input
                    type="text"
                    className="form-control w-full"
                    id="name"
                    {...register("key")}
                    placeholder="Tên danh mục"
                  />
                  {errors?.key && (
                    <p className="text-red-500 mt-1 text-sm">
                      {errors.key.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-span-12">
                <div className="form-group">
                  <label htmlFor="name">Danh mục giới thiệu</label>
                  <select {...register("cate")} className="form-control">
                    <option value="">Vui lòng chọn danh mục</option>
                    {cates &&
                      cates.map((cate, index) => {
                        return (
                          <option key={cate.id} value={cate.id}>
                            {cate.name}
                          </option>
                        );
                      })}
                  </select>
                  {errors?.cate && (
                    <p className="text-red-500 mt-1 text-sm">
                      {errors.cate.message}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 w-[200px] rounded-lg text-slate-50 bg-blue-500"
              >
                Cập nhật danh mục
              </button>
            </div>
          </form>
        )}
      </div>
    </LayoutAdmin>
  );
};

export default EditOptionCate;
