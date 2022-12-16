const express = require("express");
const {
  createComment,
  createLikeComment,
} = require("../controllers/CommentController");

const { isAuthentication, isAdmin } = require("../Middeware/AuthMiddleware");

let router = express.Router();

router.post("/", [isAuthentication], createComment);
router.post("/like", [isAuthentication], createLikeComment);

module.exports = router;
