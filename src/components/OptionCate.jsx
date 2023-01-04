import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OptionCateChild from "./OptionCateChild";

const OptionCate = ({ item, id_user, fetchProfile }) => {
  const [showForm, setShowForm] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const [data, setData] = useState();
  const [dataEdit, setDataEdit] = useState();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    console.log({
      user_id: id_user,
      option_profile_id: item?.id,
      value: data,
      status: 1,
    });
    try {
      setLoading(true);

      const response = await axios({
        method: "POST",
        url: "auth/profile",
        data: {
          user_id: id_user,
          option_profile_id: item?.id,
          value: data,
          status: 1,
        },
      });
      if (response.status == 201) {
        console.log(response);
        fetchProfile();

        setShowForm(false);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);

      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    console.log(data);
    console.log(dataEdit);

    try {
      setLoading(true);

      const response = await axios({
        method: "PATCH",
        url: "auth/profile/" + data?.id,
        data: {
          value: dataEdit,
        },
      });
      if (response.status == 200) {
        console.log(response);
        fetchProfile();

        setShowFormEdit(false);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);

      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };

  const deleteOption = async (id) => {
    try {
      setLoading(true);

      const response = await axios({
        method: "DELETE",
        url: "auth/profile/" + id,
      });
      if (response.status == 200) {
        console.log(response);
        fetchProfile();

        setLoading(false);
      }
    } catch (e) {
      setLoading(false);

      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  return (
    <div>
      <p className="text-black text-lg font-semibold">{item.key}</p>
      {!showForm && !showFormEdit && id_user == user?.id && (
        <p
          onClick={() => setShowForm(true)}
          className="flex gap-3 text-blue-500 items-center"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </span>
          <span className="font-bold hover:underline cursor-pointer">
            {"Thêm " + item.key}
          </span>
        </p>
      )}

      <ul className="list-disc pl-4">
        {item?.profile_data?.length > 0 &&
          item?.profile_data
            .filter((a) => a.user_id == +id_user)
            .map((option) => (
              <OptionCateChild
                key={option.id}
                showAction={id_user == user?.id}
                deleteOption={deleteOption}
                setShowFormEdit={setShowFormEdit}
                setData={setData}
                showFormEdit={showFormEdit}
                option={option}
              ></OptionCateChild>
            ))}
      </ul>

      {showForm && (
        <form onSubmit={handleCreateProfile} action="" className="my-3">
          <div className="my-3">
            <input
              onChange={(e) => setData(e.target.value)}
              className="outline-none form-control text-black"
              type="text"
              defaultValue={data}
              placeholder={item.key}
            />
          </div>
          <div className="my-3">
            <select className="form-control" name="" id="">
              <option value="1">Công khai</option>
            </select>
          </div>
          <div className="flex gap-3 justify-end">
            <span
              onClick={() => {
                setShowForm(false);
                setData("");
              }}
              className="px-3 py-2 bg-gray-300 text-black font-bold hover:bg-red-500 hover:scale-105 transition-all  rounded-xl cursor-pointer"
            >
              Hủy
            </span>
            {data && !loading ? (
              <button
                type="submit"
                className="px-3 py-2 hover:scale-105 transition-all  rounded-xl font-bold bg-blue-500 text-white"
              >
                Lưu
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="px-3 py-2 cursor-no-drop bg-gray-200 rounded-xl font-bold"
              >
                Lưu
              </button>
            )}
          </div>
        </form>
      )}
      {showFormEdit && (
        <form onSubmit={handleEditProfile} action="" className="my-3">
          <div className="my-3">
            <input
              onChange={(e) => setDataEdit(e.target.value)}
              className="outline-none form-control text-black"
              type="text"
              defaultValue={data.value}
              placeholder={item.key}
            />
          </div>
          <div className="my-3">
            <select className="form-control" name="" id="">
              <option value="1">Công khai</option>
            </select>
          </div>
          <div className="flex gap-3 justify-end">
            <span
              onClick={() => {
                setShowFormEdit(false);
                setData("");
              }}
              className="px-3 py-2 bg-gray-300 text-black font-bold hover:bg-red-500 hover:scale-105 transition-all  rounded-xl cursor-pointer"
            >
              Hủy
            </span>
            {data && !loading ? (
              <button
                type="submit"
                className="px-3 py-2 hover:scale-105 transition-all  rounded-xl font-bold bg-blue-500 text-white"
              >
                Lưu
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="px-3 py-2 cursor-no-drop bg-gray-200 rounded-xl font-bold"
              >
                Lưu
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default OptionCate;
