import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchNotis } from "../store/reducers/userReducer";
import { CaculateTime } from "../trait/CaculateTime";
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",

  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function HeaderClient({
  user,
  socket,
  requestFriend,
  search = "",
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNoti, setShowNoti] = React.useState(false);
  const { nofitycations, loopNoti } = useSelector((state) => state.user);
  const fetchNoti = () => {
    dispatch(handleFetchNotis());
  };

  React.useEffect(() => {
    socket?.off("fetchNoti");
    // socket.current = io("ws://localhost:8900");
    socket?.on("fetchNoti", (data) => {
      dispatch(handleFetchNotis());
    });
  }, []);
  React.useEffect(() => {
    fetchNoti();
  }, []);

  const readNotis = async () => {
    try {
      const response = await axios({
        method: "PATCH",
        url: "/auth/notifycation/" + user?.id,
      });
      if (response.status === 200) {
        fetchNoti();
      }
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          navigate("/profile/" + user?.id);
        }}
      >
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          navigate("/messager");
        }}
      >
        <IconButton size="large" aria-label="show 4 new mails" color="">
          <Badge badgeContent={4} color="error">
            <QuestionAnswerIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color=""
        >
          {nofitycations && (
            <Badge
              onClick={() => {
                setShowNoti((showNoti) => !showNoti);
              }}
              badgeContent={nofitycations.noty_count}
              color="error"
            >
              <NotificationsIcon />
            </Badge>
          )}
        </IconButton>

        <p>Notifications</p>

        {showNoti && (
          <div className="xl:w-[28vw] lg:w-[75vw]  w-[85vw] fixed top-1/4 right-[10%]  z-10 h-[60vh] overflow-y-auto shadow_noti  rounded-lg py-3 px-2 bg-white">
            <p className="text-2xl m-0 text-black text-start font-bold">
              Thông báo
            </p>
            <div className="flex gap-3 my-2">
              <span className="text-sm opacity-70 hover:opacity-100 transition-all font-bold text-blue-700 bg-blue-200 p-2 rounded-full">
                Tất cả
              </span>
            </div>
            <div className="flex flex-col break-all">
              {nofitycations?.notys?.length > 0 ? (
                nofitycations?.notys?.map((item) => (
                  <div
                    key={item.id}
                    className="p-2 hover:bg-gray-300 transition-all rounded-lg flex items-center gap-3"
                  >
                    <span className=" block w-[20%] xl:w-[10%]">
                      <img
                        className="w-full  rounded-full"
                        src={
                          item?.user_data?.avatar
                            ? item?.user_data?.avatar
                            : "http://localhost:5173/undraw_profile.svg"
                        }
                        alt=""
                      />
                    </span>
                    <div className="flex flex-col gap-1   w-[80%]">
                      <p className="m-0 css_dot  text-sm font-semibold text-black">
                        {item.text}
                      </p>
                      <span className="text-sm text-start text-blue-400 font-semibold">
                        {CaculateTime(item.createdAt)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center">
                  {" "}
                  không có thông báo
                </div>
              )}
            </div>
          </div>
        )}
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color=""
        >
          {/* <AccountCircle /> */}
          <img
            onClick={() => {
              navigate("/profile/" + user?.id);
            }}
            className="w-[40px] rounded-full"
            src={user?.avatar ? user.avatar : ""}
            alt=""
          />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const [searchGlobal, setSearchGlobal] = useState("");
  return (
    <Box className="h-[8.5vh]" sx={{ flexGrow: 1 }}>
      <AppBar className="bg-white z-[100]">
        <Toolbar>
          <Link to="/home" className="mr-2">
            <img
              src="http://localhost:5173/logo-HSV.png"
              className="w-[60px] h-[60px]"
              alt=""
            />
          </Link>
          <Search className="rounded-full text-black">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                if (searchGlobal) {
                  navigate(`/search/top/?q=${searchGlobal}`);
                }
              }}
            >
              <input
                onChange={(e) => setSearchGlobal(e.target.value)}
                type="text"
                defaultValue={search}
                className="pr-3 pl-5 outline-none rounded-full py-2 bg-gray-200"
                placeholder="Tìm kiếm"
              />
            </form>
          </Search>
          <Box sx={{ flexGrow: 1 }}>
            <div className="px-5 xl:flex gap-[20px] hidden">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "relative hover:bg-gray-200 py-1 text-center flex justify-center px-3 rounded-lg w-[100px]  before:w-[100%] before:-translate-x-1/2 before:-bottom-[30%] before:left-1/2 before:h-[5px] before:absolute before:content-['']  before:bg-blue-500"
                    : "relative hover:bg-gray-200 py-1 text-center flex justify-center px-3 rounded-lg w-[100px]"
                }
                to="/home"
              >
                <span className="block h-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </span>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "relative hover:bg-gray-200 py-1 text-center text-blue-500 flex justify-center px-3 rounded-lg w-[100px]  before:w-[100%] before:-translate-x-1/2 before:-bottom-[30%] before:left-1/2 before:h-[5px] before:absolute before:content-['']  before:bg-blue-500"
                    : "relative hover:bg-gray-200 py-1 text-center flex text-gray-700 justify-center px-3 rounded-lg w-[100px] "
                }
                to="/friends"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
                {requestFriend?.length > 0 && (
                  <div className="absolute top-0 left-[60%] w-[20px] text-white bg-red-500 flex items-center justify-center h-[20px] rounded-full p-1">
                    {requestFriend?.length > 0 ? requestFriend.length : ""}
                  </div>
                )}
              </NavLink>
            </div>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="">
              <Badge badgeContent={4} color="error">
                <QuestionAnswerIcon
                  onClick={() => {
                    navigate("/messager");
                    // location.href = "/messager";
                  }}
                />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color=""
              // className="relative"
            >
              {nofitycations && (
                <Badge
                  onClick={() => {
                    setShowNoti((showNoti) => !showNoti);
                  }}
                  badgeContent={nofitycations.noty_count}
                  color="error"
                >
                  <NotificationsIcon />
                </Badge>
              )}
              {showNoti && (
                <div className="xl:w-[28vw] w-[40vw] absolute z-10 h-[60vh] overflow-y-auto shadow_noti right-0 top-[90%] rounded-lg py-3 px-2 bg-white">
                  <div className="flex justify-between items-center">
                    <p className="text-2xl  m-0 text-black text-start font-bold">
                      Thông báo
                    </p>
                    <p
                      onClick={() => {
                        readNotis();
                      }}
                      className="m-0 text-sm text-blue-400 px-2 py-1 hover:bg-blue-100 rounded-full"
                    >
                      Đánh dấu đã đọc
                    </p>
                  </div>
                  <div className="flex gap-3 my-2">
                    <span className="text-sm opacity-70 hover:opacity-100 transition-all font-bold text-blue-700 bg-blue-200 p-2 rounded-full">
                      Tất cả
                    </span>
                  </div>
                  <div className="flex flex-col">
                    {nofitycations?.notys?.length > 0 ? (
                      nofitycations?.notys?.map((item) => {
                        if (item.read == 0)
                          return (
                            <div
                              key={item.id}
                              className="p-2 my-1 texy-start hover:bg-gray-400 bg-gray-300 transition-all rounded-lg  flex items-center gap-3"
                            >
                              <span className="block w-[10%]">
                                <img
                                  className="w-full block rounded-full"
                                  src={
                                    item?.avatar
                                      ? item?.avatar
                                      : "http://localhost:5173/undraw_profile.svg"
                                  }
                                  alt=""
                                />
                              </span>
                              <div className="flex flex-col gap-1 w-[90%]">
                                <span className="text-sm text-start font-semibold text-black">
                                  {item.text}
                                </span>
                                <div className="flex justify-between">
                                  <span className="text-sm text-start text-blue-400 font-semibold">
                                    {CaculateTime(item.createdAt)}
                                  </span>
                                  <span className="p-2 inline-block w-[20px] h-[20px] text-end bg-blue-500 rounded-full"></span>
                                </div>
                              </div>
                            </div>
                          );
                        return (
                          <div
                            key={item.id}
                            className="p-2 my-1 hover:bg-gray-300 transition-all rounded-lg flex items-center gap-3"
                          >
                            <span className="block w-[10%]">
                              <img
                                className="w-full rounded-full"
                                src={
                                  item?.avatar
                                    ? item?.avatar
                                    : "http://localhost:5173/undraw_profile.svg"
                                }
                                alt=""
                              />
                            </span>
                            <div className="flex flex-col gap-1 w-[90%] ">
                              <span className="text-sm text-start font-semibold text-black">
                                {item.text}
                              </span>
                              <span className="text-sm text-start text-blue-400 font-semibold">
                                {CaculateTime(item.createdAt)}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex items-center justify-center">
                        {" "}
                        không có thông báo
                      </div>
                    )}
                  </div>
                </div>
              )}
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color=""
            >
              {/* <AccountCircle /> */}
              <img
                className="w-[40px] rounded-full"
                src={
                  user?.avatar
                    ? user.avatar
                    : "http://localhost:5173/undraw_profile.svg"
                }
                alt=""
              />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color=""
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
