const express = require("express");
const { createLike } = require("../controllers/LikeController");

const { isAuthentication, isAdmin } = require("../Middeware/AuthMiddleware");

let router = express.Router();

router.post("/", [isAuthentication], createLike);

module.exports = router;
