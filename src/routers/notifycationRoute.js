const express = require("express");
const {
  getNotifycationUser,
  readNotis,
} = require("../controllers/NotifycationController");

const { isAuthentication, isAdmin } = require("../Middeware/AuthMiddleware");

let router = express.Router();

router.get("/:id", [isAuthentication], getNotifycationUser);
router.patch("/:id", [isAuthentication], readNotis);

module.exports = router;
