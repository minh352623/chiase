const express = require("express");
const {
  createReportPost,
  getReportAdmin,
  getNotiReport,
  browserUpdateReport,
} = require("../controllers/ReportPostController");

const { isAuthentication, isAdmin } = require("../Middeware/AuthMiddleware");

let router = express.Router();

router.post("/", [isAuthentication], createReportPost);
router.get("/", [isAuthentication, isAdmin], getReportAdmin);
router.get("/notiReport", [isAuthentication, isAdmin], getNotiReport);
router.patch("/", [isAuthentication, isAdmin], browserUpdateReport);

module.exports = router;
