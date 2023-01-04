import { Fragment, useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/admin/Dashboard";
import CreateGroup from "./pages/admin/groupuser/CreateGroup";
import EditGroup from "./pages/admin/groupuser/EditGroup";
import ListGroup from "./pages/admin/groupuser/ListGroup";
import CreateUser from "./pages/admin/user/CreateUser";
import EditUser from "./pages/admin/user/EditUser";
import Listuser from "./pages/admin/user/ListUser";
import Index from "./pages/client";
import Home from "./pages/client/Home";
import Login from "./pages/Login";
import LoginAdmin from "./pages/LoginAdmin";
import Register from "./pages/Register";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/reducers/authReducer";
import PrivateRoute from "./routeAuthentication/PrivateRoute";
import ListPost from "./pages/admin/post/ListPost";
import Messager from "./pages/client/Messager";
import { io } from "socket.io-client";
import jwt_decode from "jwt-decode";
import {
  handleFetchFriends,
  handleFetchTokenCallVideo,
} from "./store/reducers/userReducer";
import ListOption from "./pages/admin/optionReport/ListOption";
import AddOption from "./pages/admin/optionReport/AddOption";
import EditOption from "./pages/admin/optionReport/EditOption";
import ListReportPost from "./pages/admin/reportPost/ListReportPost";
import TrashUser from "./pages/admin/user/TrashUser";
import Profile from "./pages/client/Profile";
import ListCate from "./pages/admin/cateProfile/ListCate";
import AddCate from "./pages/admin/cateProfile/AddCate";
import EditCate from "./pages/admin/cateProfile/EditCate";
import ListOptionCate from "./pages/admin/optionCate/ListOptionCate";
import AddOptionCate from "./pages/admin/optionCate/AddOptionCate";
import EditOptionCate from "./pages/admin/optionCate/EditOptionCate";
import Friends from "./pages/client/Friends";
import SearchTop from "./pages/client/SearchTop";
// import jwt from "jsonwebtoken";

function App() {
  const [socket, setSocket] = useState();
  const { user, friends } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setSocket(io("http://localhost:8900"));
    const FetchUserReload = () => {
      try {
        let accessToken = localStorage.getItem("access_token") || {};
        var decodedPayload = jwt_decode(accessToken)?.dataValues || null;
        dispatch(setUser(decodedPayload));
      } catch (e) {
        console.log(e);
      }
    };
    FetchUserReload();
  }, []);
  useEffect(() => {
    socket?.emit("addUser", user?.id);
  }, [user, socket]);
  useEffect(() => {
    dispatch(handleFetchTokenCallVideo());
  }, [user]);

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Login />}></Route>

        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {socket && (
          <>
            <Route path="/home" element={<Home socket={socket} />}></Route>
            <Route
              path="/messager"
              element={<Messager socket={socket} />}
            ></Route>
            <Route
              path="/profile/:id"
              element={<Profile socket={socket} />}
            ></Route>
            <Route
              path="/friends"
              element={<Friends socket={socket} />}
            ></Route>
            <Route path="/search/top" element={<SearchTop socket={socket} />} />
          </>
        )}

        <Route
          path="/admin/login"
          element={
            // <PrivateRoute roles={[1]}>
            <LoginAdmin />
            // </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin/groupuser"
          element={
            <PrivateRoute roles={[1]}>
              <ListGroup socket={socket} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin/groupuser/create"
          element={
            <PrivateRoute roles={[1]}>
              <CreateGroup socket={socket} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin/groupuser/:id"
          element={
            <PrivateRoute roles={[1]}>
              <EditGroup socket={socket} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin/user"
          element={
            <PrivateRoute roles={[1]}>
              <Listuser socket={socket} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin/user/trash"
          element={
            <PrivateRoute roles={[1]}>
              <TrashUser socket={socket} />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/admin/user/create"
          element={
            <PrivateRoute roles={[1]}>
              <CreateUser />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin/user/:id"
          element={
            <PrivateRoute roles={[1]}>
              <EditUser socket={socket} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin"
          element={
            <PrivateRoute roles={[1]}>
              <Dashboard socket={socket} />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute roles={[1]}>
              <Dashboard socket={socket} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin/post"
          element={
            <PrivateRoute roles={[1]}>
              <ListPost socket={socket} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin/option_report"
          element={
            <PrivateRoute roles={[1]}>
              <ListOption socket={socket} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin/option/create"
          element={
            <PrivateRoute roles={[1]}>
              <AddOption socket={socket} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin/option/:id"
          element={
            <PrivateRoute roles={[1]}>
              <EditOption socket={socket} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin/report"
          element={
            <PrivateRoute roles={[1]}>
              <ListReportPost socket={socket} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin/cate-profile"
          element={
            <PrivateRoute roles={[1]}>
              <ListCate socket={socket} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin/cate-profile/create"
          element={
            <PrivateRoute roles={[1]}>
              <AddCate socket={socket} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin/cate-profile/:id"
          element={
            <PrivateRoute roles={[1]}>
              <EditCate socket={socket} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin/option-profile"
          element={
            <PrivateRoute roles={[1]}>
              <ListOptionCate socket={socket} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin/option-profile/create"
          element={
            <PrivateRoute roles={[1]}>
              <AddOptionCate socket={socket} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin/option-profile/:id"
          element={
            <PrivateRoute roles={[1]}>
              <EditOptionCate socket={socket} />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
