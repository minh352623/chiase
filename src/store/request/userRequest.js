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
export const fetchFriends = (id) => {
  return axios({
    method: "GET",
    url: "/auth/admin/user/getFriends/" + id,
  });
};
export const handleAcceptFriend = (data) => {
  return axios({
    method: "PATCH",
    url: "/auth/friend/accept/" + data.id,
    data: data,
  });
};
export const handleRefuseFriend = (id) => {
  return axios({
    method: "DELETE",
    url: "/auth/friend/refuse/" + id,
  });
};
export const fetchRequestFriends = (id) => {
  return axios({
    method: "GET",
    url: "/auth/friend/" + id,
  });
};
