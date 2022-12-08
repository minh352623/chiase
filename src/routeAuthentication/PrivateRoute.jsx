import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";

const PrivateRoute = ({ children, roles }) => {
  let accessToken = localStorage.getItem("access_token") || {};
  var user = jwt_decode(accessToken)?.dataValues || null;
  if (!user) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Vui lòng đăng nhập để tiếp tục!",
    });

    return <Navigate to="/login" />;
  }
  console.log(roles);
  if (
    roles &&
    !roles?.some((r) => {
      console.log(user.group_id);
      console.log(r);
      console.log(+user.group_id == r);
      return +user.group_id == r;
    })
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Bạn không có quyền truy cập!",
    });
    return <Navigate to="/home" />;
  }
  return children;
};

export default PrivateRoute;
