const express = require("express");
const {
  getListUser,
  createUser,
  getUser,
  UpdateUser,
  DeleteUser,
  getUserHome,
  getTokenVideo,
  getUserTrash,
  restoreUser,
  DeleteUserForce,
  exportExcel,
  importExcel,
} = require("../controllers/userController");

const { isAuthentication, isAdmin } = require("../Middeware/AuthMiddleware");

let router = express.Router();
router.get("/exportExcel", [isAuthentication], exportExcel);
router.post("/importExcel", [isAuthentication], importExcel);

router.get("/callVideo/:id", [isAuthentication], getTokenVideo);
router.get("/", [isAuthentication, isAdmin], getListUser);
router.get("/home", [isAuthentication], getUserHome);

router.get("/trash", [isAuthentication, isAdmin], getUserTrash);
router.get("/:id", [isAuthentication], getUser);
router.patch("/restore/:id", [isAuthentication, isAdmin], restoreUser);

router.patch("/:id", [isAuthentication, isAdmin], UpdateUser);

router.post("/", [isAuthentication, isAdmin], createUser);
router.delete("/force/:id", [isAuthentication, isAdmin], DeleteUserForce);

router.delete("/:id", [isAuthentication, isAdmin], DeleteUser);

module.exports = router;
