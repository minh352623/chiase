const express = require("express");
const { getMessages } = require("../controllers/MessageContoller");

const { isAuthentication, isAdmin } = require("../Middeware/AuthMiddleware");

let router = express.Router();

router.get("/:idConversation", [isAuthentication], getMessages);

module.exports = router;
