const express = require("express");
const {
  addFriend,
  acceptFriend,
  refuseFriend,
  getRequestFriend,
  getAcceptFriend,
  getFriendSearch,
} = require("../controllers/FriendController");

const { isAuthentication, isAdmin } = require("../Middeware/AuthMiddleware");

let router = express.Router();
router.get("/accept/:id", [isAuthentication], getAcceptFriend);
router.get("/search", [isAuthentication], getFriendSearch);

router.post("/", [isAuthentication], addFriend);
router.patch("/accept/:id", [isAuthentication], acceptFriend);
router.delete("/refuse/:id", [isAuthentication], refuseFriend);
router.get("/:id", [isAuthentication], getRequestFriend);

module.exports = router;
