const express = require("express");
const {
  getMessages,
  createMessage,
} = require("../controllers/MessageContoller");

const { isAuthentication, isAdmin } = require("../Middeware/AuthMiddleware");

let router = express.Router();

router.get("/:idConversation", [isAuthentication], getMessages);
router.post("/", [isAuthentication], createMessage);

module.exports = router;
