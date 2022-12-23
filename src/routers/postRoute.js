const express = require("express");
const {
  createPost,
  getPostHome,
  getPostAdmin,
  getDetailPost,
  deletePost,
  UpdatePost,
} = require("../controllers/PostController");

const { isAuthentication, isAdmin } = require("../Middeware/AuthMiddleware");

let router = express.Router();
router.post("/", [isAuthentication], createPost);

router.get("/home", [isAuthentication], getPostHome);
router.get("/detail/:id", [isAuthentication], getDetailPost);
router.get("/", [isAuthentication, isAdmin], getPostAdmin);
router.delete("/:id", [isAuthentication], deletePost);
router.patch("/:id", [isAuthentication], UpdatePost);

module.exports = router;
