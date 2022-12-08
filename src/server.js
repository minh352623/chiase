const express = require("express");
const connectDB = require("./config/connectDb");
const userRouter = require("./routers/UserRoute");
const groupRouter = require("./routers/groupRoute");
const authRouter = require("./routers/authRoute");
const postRouter = require("./routers/postRoute");
const conversationRouter = require("./routers/conversationRoute");
const messageRouter = require("./routers/messageRoute");

var bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const app = express();

var cors = require("cors");
app.use(cors());
require("dotenv").config();
let port = process.env.PORT;
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

app.listen(port, function () {
  console.log(`khoi tao server hi ${process.env.PORT}`);
});
