const express = require("express");
const {
  createConversation,
  getConversation,
} = require("../controllers/ConversationController");

const { isAuthentication, isAdmin } = require("../Middeware/AuthMiddleware");

let router = express.Router();

router.post("/", [isAuthentication], createConversation);
router.get("/", [isAuthentication], getConversation);

module.exports = router;
