import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../../layouts/LayoutAdmin";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const schema = yup.object({
  key: yup.string().min(2, "Key option phải lớn hơn 2 kí tự"),
  cate: yup.string().required("Danh mục không được để trống!"),
});
const AddOptionCate = ({ socket }) => {
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
  const [cates, setCates] = useState();
  const [loading, setLoading] = useState(false);

  const createCateProfile = async (values) => {
    if (!isValid) return;

    console.log(values);
    try {
      const response = await axios({
        method: "post",
        url: "/auth/admin/option-profile",
        data: values,
      });
      if (response.status === 200) {
        navigate("/admin/option-profile");
      }
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        navigate("/admin/login");
      }
    }
    reset();
  };
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
  return (
    <LayoutAdmin socket={socket}>
      <div className="my-3">
        <h1 className="text-center">Thêm option danh mục</h1>
        <form onSubmit={handleSubmit(createCateProfile)}>
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
              Thêm option
            </button>
          </div>
        </form>
      </div>
    </LayoutAdmin>
  );
};

export default AddOptionCate;
