import { Fragment, useEffect, useRef, useState, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/reducers/authReducer";
import PrivateRoute from "./routeAuthentication/PrivateRoute";
import { io } from "socket.io-client";
import jwt_decode from "jwt-decode";

import Dashboard from "./pages/admin/Dashboard";
import CreateGroup from "./pages/admin/groupuser/CreateGroup";
import EditGroup from "./pages/admin/groupuser/EditGroup";
import ListGroup from "./pages/admin/groupuser/ListGroup";
import CreateUser from "./pages/admin/user/CreateUser";
import EditUser from "./pages/admin/user/EditUser";
import Listuser from "./pages/admin/user/ListUser";
import Home from "./pages/client/Home";
import Login from "./pages/Login";
import LoginAdmin from "./pages/LoginAdmin";
import Register from "./pages/Register";
import ListPost from "./pages/admin/post/ListPost";
import Messager from "./pages/client/Messager";
import {
  handleFetchFriends,
  handleFetchTokenCallVideo,
  setFaceioInstance,
} from "./store/reducers/userReducer";
import StartedGameBc from "./pages/client/StartedGameBc";
const GameBauCua = lazy(() => import("./pages/client/GameBauCua"));

const WaitingRoomBauCua = lazy(() =>
  import("./pages/client/WaitingRoomBauCua")
);

const MiniGame = lazy(() => import("./pages/client/MiniGame"));

const ListOption = lazy(() => import("./pages/admin/optionReport/ListOption"));
const AddOption = lazy(() => import("./pages/admin/optionReport/AddOption"));
const EditOption = lazy(() => import("./pages/admin/optionReport/EditOption"));

const ListReportPost = lazy(() =>
  import("./pages/admin/reportPost/ListReportPost")
);

const TrashUser = lazy(() => import("./pages/admin/user/TrashUser"));
const Profile = lazy(() => import("./pages/client/Profile"));

const ListCate = lazy(() => import("./pages/admin/cateProfile/ListCate"));

const AddCate = lazy(() => import("./pages/admin/cateProfile/AddCate"));

const EditCate = lazy(() => import("./pages/admin/cateProfile/EditCate"));

const ListOptionCate = lazy(() =>
  import("./pages/admin/optionCate/ListOptionCate")
);

const AddOptionCate = lazy(() =>
  import("./pages/admin/optionCate/AddOptionCate")
);

const EditOptionCate = lazy(() =>
  import("./pages/admin/optionCate/EditOptionCate")
);
const Friends = lazy(() => import("./pages/client/Friends"));
const SearchTop = lazy(() => import("./pages/client/SearchTop"));

const LoginGoogleSuccess = lazy(() =>
  import("./pages/client/LoginGoogleSuccess")
);

const LoginGithubSuccess = lazy(() =>
  import("./pages/client/LoginGithubSuccess")
);

const ForgotPassword = lazy(() => import("./pages/client/ForgotPassword"));

const ResetPassword = lazy(() => import("./pages/client/ResetPassword"));

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
  let faceioInstance = null;
  useEffect(() => {
    const faceioScript = document.createElement("script");
    faceioScript.src = "//cdn.faceio.net/fio.js";
    faceioScript.async = true;
    faceioScript.onload = () => faceioScriptLoaded();
    document.body.appendChild(faceioScript);

    return () => {
      document.body.removeChild(faceioScript);
    };
  }, []);
  const faceioScriptLoaded = () => {
    console.log(faceIO);
    if (faceIO && !faceioInstance) {
      faceioInstance = new faceIO("fioa0d2f");
      dispatch(setFaceioInstance(faceioInstance));
    }
  };
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/password/reset" element={<ResetPassword />}></Route>

          <Route
            path="/login-google-success/:id"
            element={<LoginGoogleSuccess />}
          ></Route>
          <Route
            path="/login-facebook-success/:id"
            element={<LoginGoogleSuccess />}
          ></Route>
          <Route
            path="/login-github-success/:id"
            element={<LoginGithubSuccess />}
          ></Route>
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
              <Route
                path="/search/top"
                element={<SearchTop socket={socket} />}
              />
              <Route path="/mini-game" element={<MiniGame socket={socket} />} />
              <Route
                path="/game/play/baucua"
                element={<GameBauCua socket={socket} />}
              />
              <Route
                path="/game/play/baucua/waiting"
                element={<WaitingRoomBauCua socket={socket} />}
              />
              <Route
                path="/game/play/baucua/started"
                element={<StartedGameBc socket={socket} />}
              />
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
      </Suspense>

      <ToastContainer />
    </Fragment>
  );
}

export default App;
