const express = require("express");
const {
  createHistorySearch,
  getSuggestUser,
} = require("../controllers/HistorySearchController");

const { isAuthentication, isAdmin } = require("../Middeware/AuthMiddleware");

let router = express.Router();
router.get("/", [isAuthentication], getSuggestUser);

router.post("/", [isAuthentication], createHistorySearch);

module.exports = router;
