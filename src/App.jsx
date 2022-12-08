import { Fragment, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { setUser } from "./store/reducers/authReducer";
import PrivateRoute from "./routeAuthentication/PrivateRoute";
import ListPost from "./pages/admin/post/ListPost";
import Messager from "./pages/client/Messager";
function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Login />}></Route>

        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/messager" element={<Messager />}></Route>

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
              <ListGroup />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin/groupuser/create"
          element={
            <PrivateRoute roles={[1]}>
              <CreateGroup />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin/groupuser/:id"
          element={
            <PrivateRoute roles={[1]}>
              <EditGroup />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin/user"
          element={
            <PrivateRoute roles={[1]}>
              <Listuser />
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
              <EditUser />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin"
          element={
            <PrivateRoute roles={[1]}>
              <Dashboard />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute roles={[1]}>
              <Dashboard />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin/post"
          element={
            <PrivateRoute roles={[1]}>
              <ListPost />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
