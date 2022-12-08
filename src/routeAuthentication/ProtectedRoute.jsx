import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Vui lòng đăng nhập để tiếp tục!",
    });

    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
