import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import LayoutAdmin from "../../../layouts/LayoutAdmin";
import { useRef } from "react";
import { useEffect } from "react";
const schema = yup.object({
  text: yup.string().min(5, "Mô tả phải lơn hơn 5 kí tự"),
});
const AddOption = ({ socket }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
  const showImg = useRef();
  const [img, setImg] = useState("");
  const showImage = (e) => {
    const [file] = e.target.files;
    setImg(e.target.files);
    if (file) {
      showImg.current.src = URL.createObjectURL(file);
    }
  };

  const createOption = async (values) => {
    console.log(values);
    console.log(img);
    if (!img || !values.text) return;
    let formData = new FormData();
    formData.append("img", img[0]);
    formData.append("text", values.text);
    try {
      setLoading(true);
      const response = await axios({
        method: "post",
        url: "/auth/admin/option_report",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      if (response.status === 200) {
        navigate("/admin/option_report");
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
  return (
    <LayoutAdmin socket={socket}>
      <div className="my-3">
        <h1 className="text-center">Create Option</h1>
        <form onSubmit={handleSubmit(createOption)}>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-3">
              <div className="form-group">
                <label htmlFor="avatar">Ảnh</label>
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
                    <label htmlFor="text">Text</label>
                    <input
                      type="text"
                      className={`form-control w-full`}
                      id="text"
                      {...register("text")}
                      placeholder="Enter your text"
                    />
                    {errors?.text && (
                      <p className="text-red-500 mt-1 text-sm">
                        {errors.text.message}
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
                  {loading ? "Đang xứ lý....." : "Add Option"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </LayoutAdmin>
  );
};

export default AddOption;
