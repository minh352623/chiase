const express = require("express");
const {
  createPofileUser,
  fetchAllProfile,
  updateProfile,
  deleteOption,
} = require("../controllers/ProfileUserController");

const { isAuthentication, isAdmin } = require("../Middeware/AuthMiddleware");

let router = express.Router();

router.post("/", [isAuthentication], createPofileUser);
// router.get("/", [isAuthentication, isAdmin], getReportAdmin);
// router.get("/notiReport", [isAuthentication, isAdmin], getNotiReport);
router.patch("/:id", [isAuthentication], updateProfile);
router.get("/fetchAll", [isAuthentication], fetchAllProfile);
router.delete("/:id", [isAuthentication], deleteOption);

module.exports = router;
