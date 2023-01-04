import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OptionCate from "./OptionCate";
import Profile from "./Profile";

const AboutProfile = ({ id_user }) => {
  const navigate = useNavigate();

  const [tab, setTab] = useState(1);
  const [cates, setCates] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const fetchCates = async () => {
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
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  const fetchOption = async (id) => {
    try {
      setOption(id);

      const response = await axios({
        url: "/auth/admin/option-profile/cate/" + id + "/?user_id=" + id_user,
      });
      if (response.status === 200) {
        console.log(response);
        setProfile("");

        setData(response.data);
      }
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  const [option, setOption] = useState(-1);

  const [profile, setProfile] = useState();
  const fetchProfile = async () => {
    try {
      setOption(-1);
      const response = await axios({
        url: "/auth/profile/fetchAll/?user_id=" + id_user,
      });
      if (response.status === 200) {
        console.log(response);
        let arrNew = {};
        response.data.data.forEach((item) => {
          if (arrNew[item.option_profile_id]?.length > 0) {
            arrNew[item.option_profile_id].push(item);
          } else {
            arrNew[item.option_profile_id] = [];

            arrNew[item.option_profile_id].push(item);
          }
        });
        console.log(arrNew);
        setData("");

        setProfile(arrNew);
      }
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    fetchCates();
    fetchProfile();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-3 rounded-xl shadow_main bg-white">
      <div className="col-span-4 border-r border-gray-300 p-2">
        <div className="p-2">
          <h5 className="font-bold text-black">Giới thiệu</h5>
          <ul className="mt-3">
            <li
              onClick={fetchProfile}
              className={`font-bold my-2 text-gray-700 p-2 hover:bg-gray-200 rounded-lg cursor-pointer ${
                option == -1 ? "bg-gray-300" : ""
              }`}
            >
              Tổng quan
            </li>
            {cates?.length > 0 &&
              cates.map((cate) => (
                <li
                  onClick={() => fetchOption(cate.id)}
                  key={cate.id}
                  className={`font-bold my-2 text-gray-700 p-2 hover:bg-gray-200 rounded-lg cursor-pointer ${
                    option == cate.id ? "bg-gray-300" : ""
                  }`}
                >
                  {cate?.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="col-span-8 py-3 px-2">
        {profile &&
          Object.keys(profile)?.length > 0 &&
          !data &&
          Object.keys(profile).map((item) => (
            <Profile
              key={item}
              fetchOption={fetchOption}
              id_user={id_user}
              item={profile[item]}
            ></Profile>
          ))}
        {!profile ||
          (Object.keys(profile)?.length <= 0 && !data && (
            <div className="flex  items-center justify-center text-black">
              Không có dữ liệu
            </div>
          ))}
        {data?.length > 0 &&
          !profile &&
          data.map((item) => (
            <OptionCate
              key={item.id}
              fetchProfile={fetchProfile}
              id_user={id_user}
              item={item}
            ></OptionCate>
          ))}
      </div>
    </div>
  );
};

export default AboutProfile;
