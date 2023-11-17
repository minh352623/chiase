const express = require("express");
const {
  flexHeader,
  manager_online_user,
  exportExcelInfoOnline,
  addInfoDeviceUserController,
} = require("../controllers/DashBoardController");

const { isAuthentication, isAdmin } = require("../Middeware/AuthMiddleware");

let router = express.Router();

router.get("/flexHeader", [isAuthentication, isAdmin], flexHeader);
router.post("/addInfoDeviceUser", [isAuthentication], addInfoDeviceUserController);

router.get(
  "/manager_user_online",
  [isAuthentication, isAdmin],
  manager_online_user
);
router.get(
  "/exportExcelInfoOnline",
  [isAuthentication, isAdmin],
  exportExcelInfoOnline
);

module.exports = router;
