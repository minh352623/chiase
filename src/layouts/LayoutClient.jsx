import { info } from "autoprefixer";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContentCenter from "../components/ContentCenter";
import ContentLeft from "../components/ContentLeft";
import ContentRight from "../components/ContentRight";
import HeaderClient from "../components/HeaderClient";
import { setUser } from "../store/reducers/authReducer";
import jwt_decode from "jwt-decode";

const LayoutClient = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  console.log(user);
  const FetchUserReload = () => {
    let accessToken = localStorage.getItem("access_token") || {};
    var decodedPayload = jwt_decode(accessToken)?.dataValues || null;
    dispatch(setUser(decodedPayload));
  };
  useEffect(() => {
    FetchUserReload();
  }, []);
  return (
    <>
      {user && (
        <>
          <HeaderClient user={user}></HeaderClient>
          {children}
        </>
      )}
    </>
  );
};

export default LayoutClient;
