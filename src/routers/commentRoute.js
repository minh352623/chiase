const express = require("express");
const {
  createComment,
  createLikeComment,
  createReply,
} = require("../controllers/CommentController");

const { isAuthentication, isAdmin } = require("../Middeware/AuthMiddleware");

let router = express.Router();

router.post("/", [isAuthentication], createComment);
router.post("/createReply", [isAuthentication], createReply);

router.post("/like", [isAuthentication], createLikeComment);

module.exports = router;
