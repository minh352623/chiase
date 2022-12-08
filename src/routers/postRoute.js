const express = require("express");
const {
  createPost,
  getPostHome,
  getPostAdmin,
} = require("../controllers/PostController");

const { isAuthentication, isAdmin } = require("../Middeware/AuthMiddleware");

let router = express.Router();
router.post("/", [isAuthentication], createPost);
router.get("/home", [isAuthentication], getPostHome);
router.get("/", [isAuthentication, isAdmin], getPostAdmin);

module.exports = router;
