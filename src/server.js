const express = require("express");
require("./passport");

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
const roomBcRoute = require("./routers/RoomBcRoute");
const dashBoardRoute = require("./routers/DashBoardRoute");
let port = process.env.PORT;
var bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const http = require("http");
const app = express();

// socket
// const io = require("socket.io")(8900, {
//   cors: {
//     origin: "*",
//   },
// });

const server = http.createServer(app);
console.log("🚀 ~ file: server.js:37 ~ server:", server);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["content-type"],
    credentials: true,
  },
});

let users = [];

const addUser = (userId, socketId) => {
  if(users.some((user) => user.userId === userId)){
      users.filter(user => user.userId != userId);
      users.push({ userId, socketId });

  }else{
    users.push({ userId, socketId });

  }

console.log("🚀 ~ file: server.js:49 ~ users:", users)

};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  console.log("🚀 ~ file: server.js:69 ~ getUser ~ userId:", userId)
  console.log("🚀 ~ file: server.js:70 ~ getUser ~ users:", users)
  return users.find((user) => user.userId == userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");
  //take userId and socketId from user
  socket.on("addUser", async (userId) => {
    if (userId) {
      addUser(userId, socket.id);
    }

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
  //join room
  socket.on("joinRoom", (data) => {
    console.log(data);
    data?.receiverId.forEach((useRooom) => {
      const user = getUser(useRooom?.user_id);
      if (user?.socketId) {
        io.to(user?.socketId).emit("userJoinRoom", data);
      }
    });
  });
  socket.on("exitRoom", (data) => {
    console.log(data);
    data?.receiverId.forEach((useRooom) => {
      const user = getUser(useRooom?.user_id);
      if (user?.socketId) {
        io.to(user?.socketId).emit("userExitRoom", data);
      }
    });
  });
  socket.on("deleteRoom", (data) => {
    console.log(data);
    data?.receiverId.forEach((useRooom) => {
      const user = getUser(useRooom?.user_id);
      if (user?.socketId) {
        io.to(user?.socketId).emit("deleteOwnRoom", data);
      }
    });
  });

  socket.on("statusReady", (data) => {
    console.log(data);
    data?.receiverId.forEach((useRooom) => {
      const user = getUser(useRooom?.user_id);
      if (user?.socketId) {
        io.to(user?.socketId).emit("statusUserReady", data);
      }
    });
  });
  socket.on("startedGame", (data) => {
    console.log(data);
    data?.receiverId.forEach((useRooom) => {
      const user = getUser(useRooom?.user_id);
      if (user?.socketId) {
        io.to(user?.socketId).emit("startedGameBc", data);
      }
    });
  });
  //end join  room
  //when disconnect
  socket.on("disconnect", async () => {
    console.log("a user disconnected!");
    console.log(users);

    const user = users.find((user) => user.socketId == socket.id);
    console.log("logout", user);

    if (user) {
      const online_user = await db.user_online.findOne({
        where: {
          user_id: user.userId,
        },
      });
      console.log(online_user);
      if (online_user) {
        let now_date = new Date();
        let time_old = new Date(online_user.updatedAt);
        const minus = (now_date.getTime() - time_old.getTime()) / (1000 * 60);
        online_user.total_time_online = online_user.total_time_online + minus;
        await online_user.save();
      }
    }
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

module.exports = { io: io };

//socket
var cors = require("cors");
const db = require("./models");
app.use(cors());
app.use(
  cors({
    origin: "*",
    methods: ["GET, POST, OPTIONS, PUT, PATCH, DELETE"],
    credentials: true,
    maxAge: 86400,
  })
);
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

app.use("/socket_laravel_order", (req, res) => {
  console.log("🚀 ~ file: server.js:285 ~ app.use ~ req:", req.query.data)
  console.log("🚀 ~ file: server.js:285 ~ app.use ~ req:", req.query.id_bill)
  const user = getUser(req.query?.user_id);
  console.log("🚀 ~ file: server.js:292 ~ app.use ~ user:", user)
  console.log("🚀 ~ file: server.js:292 ~ app.use ~ eq.query?.user_id:", req.query?.user_id)
  io.to(user?.socketId).emit("socket_laravel_order", { message:req.query.data,id_bill:req.query.id_bill ?? null });

  res.status(200).json({"message":"sucess"})
});

app.use("/socket_laravel_user_coupon", (req, res) => {
  console.log("🚀 ~ file: server.js:290 ~ app.use ~ req:", req.query.data)
  const user = getUser(req.query?.user_id);
  io.to(user?.socketId).emit("socket_laravel_user_coupon", { message: req.query.data });

  res.status(200).json({"message":"sucess"})
});
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
app.use("/api/auth/baucua", roomBcRoute);
app.use("/api/auth/dashboard", dashBoardRoute);

server.listen(port, function () {
  console.log(`khoi tao server hi ${process.env.PORT}`);
});
