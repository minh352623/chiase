import axios from "axios";
import "../../config/common.js";

export default function fetchNotis(user) {
  return axios({
    method: "GET",
    url: "/auth/notifycation/" + user?.id,
  });
}

export const fetchTokenCallVideo = (id) => {
  return axios({
    method: "GET",
    url: "/auth/admin/user/callVideo/" + id,
  });
};
export const fetchNotiReport = (id) => {
  return axios({
    method: "GET",
    url: "/auth/report/notiReport",
  });
};
