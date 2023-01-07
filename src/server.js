const express = require("express");
const passportSetup = require("./passport");
const connectDB = require("./config/connectDb");
const userRouter = require("./routers/UserRoute");
const groupRouter = require("./routers/groupRoute");
const authRouter = require("./routers/authRoute");
const postRouter = require("./routers/postRoute");
const conversationRouter = require("./routers/conversationRoute");
const messageRouter = require("./routers/messageRoute");
const likeRoute = require("./routers/likeRoute");
const notiRoute = require("./routers/notifycationRoute");
const commentRoute = require("./routers/commentRoute");
const optionReportRoute = require("./routers/optionReportRoute");
const ReportRoute = require("./routers/reportPostRoute");
const cateProfileRoute = require("./routers/cateProfileRoute");
const optionProfileRoute = require("./routers/optionProfileRoute");
const profileRoute = require("./routers/profileRoute");
const friendRoute = require("./routers/friendRoute");
const historyRoute = require("./routers/historySearchRoute");
let port = process.env.PORT;
var bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
// const cookieSession = require("cookie-session");
// const passport = require("passport");
const app = express();

// socket
const io = require("socket.io")(8900, {
  cors: {
    origin: "*",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text, nameSender }) => {
    const user = getUser(receiverId);
    if (user && user.socketId) {
      io.to(user?.socketId).emit("getMessage", {
        senderId,
        text,
      });
      io.to(user?.socketId).emit("alertMessage", {
        nameSender: nameSender,
        text: text,
      });
    }
  });
  //like post

  socket.on("likePost", ({ likerId, nameLiker, ownPost, status, text }) => {
    const user = getUser(ownPost);
    if (user && user.socketId) {
      io.to(user.socketId).emit("getLike", {
        likerId,
        nameLiker,
        status,
        ownPost,
        text,
      });
      io.to(user.socketId).emit("fetchNoti", {});
    }
  });
  socket.on("commentPost", ({ commenter, nameCommenter, ownPost, text }) => {
    const user = getUser(ownPost);
    if (user && user.socketId) {
      io.to(user.socketId).emit("getComment", {
        commenter,
        nameCommenter,
        ownPost,
        text,
      });
      io.to(user.socketId).emit("fetchNoti", {});
    }
  });
  socket.on(
    "createLikeComment",
    ({ liker, nameLiker, ownComment, ownPost, text, status }) => {
      const user = getUser(ownComment);
      if (user && user.socketId) {
        io.to(user.socketId).emit("getNotiLikeComment", {
          liker,
          nameLiker,
          ownComment,
          ownPost,
          text,
          status,
        });
        io.to(user.socketId).emit("fetchNoti", {});
      }
    }
  );

  //call video

  socket.on("callVideo", (data) => {
    const user = getUser(data.receiverId);
    console.log(user);
    if (user?.socketId) {
      console.log(data.receiverId);
      io.to(user?.socketId).emit("videoCall", data);
    }
  });
  //end call video
  socket.on("reportToAdmin", (data) => {
    io.emit("reportToAdminCurrent", data);
  });

  //noti report to user
  socket.on("browserReport", (data) => {
    const user = getUser(data.ownPost);
    console.log(user);
    if (user?.socketId) {
      io.to(user?.socketId).emit("browserReportToUser", data);
    }
  });
  //end report

  // addfriend
  socket.on("addFriend", (data) => {
    console.log(data);
    const user = getUser(+data.receiverId);
    console.log("addfriend", user);
    if (user?.socketId) {
      io.to(user?.socketId).emit("notiAddFriend", data);
    }
  });

  socket.on("acceptAddFriend", (data) => {
    console.log(data);
    const user = getUser(+data.receiverId);
    console.log("addfriend", user);
    if (user?.socketId) {
      io.to(user?.socketId).emit("notiAcceptAddFriend", data);
    }
  });
  //end  addfriend

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

//socket
var cors = require("cors");
app.use(cors());
require("dotenv").config();
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
connectDB();
app.use("/api/auth/admin/user", userRouter);
app.use("/api/auth/admin/group", groupRouter);
app.use("/api/auth", authRouter);
app.use("/api/auth/post", postRouter);
app.use("/api/auth/conversation", conversationRouter);
app.use("/api/auth/message", messageRouter);
app.use("/api/auth/like", likeRoute);
app.use("/api/auth/notifycation", notiRoute);
app.use("/api/auth/comment", commentRoute);
app.use("/api/auth/admin/option_report", optionReportRoute);
app.use("/api/auth/report", ReportRoute);
app.use("/api/auth/admin/cate-profile", cateProfileRoute);
app.use("/api/auth/admin/option-profile", optionProfileRoute);
app.use("/api/auth/profile", profileRoute);
app.use("/api/auth/friend", friendRoute);
app.use("/api/auth/history", historyRoute);

app.listen(port, function () {
  console.log(`khoi tao server hi ${process.env.PORT}`);
});
