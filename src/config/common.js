import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "access_token"
)}`;
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    //api sau khi login mới thêm bearer
    console.log(config);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("access_token")}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
