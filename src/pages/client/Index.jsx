import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="mx-auto block w-full">
      <Link
        to="/register"
        className="px-4 py-2 rounded-lg bg-orange-500 text-slate-50"
      >
        Đăng ký
      </Link>
      <Link to="/login" className="px-4 py-2  bg-orange-500 text-slate-50">
        Đăng nhập
      </Link>
    </div>
  );
};

export default Index;
