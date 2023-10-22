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
  getUserSuggest,
  getProfileUser,
  changeAvatar,
  changeBackground,
  updateDescription,
  getFriends,
  forgotPassword,
  changePassword,
  getCoin,
  renderQR,
  readQR,
} = require("../controllers/UserController");

const { isAuthentication, isAdmin } = require("../Middeware/AuthMiddleware");

let router = express.Router();
router.get("/exportExcel", [isAuthentication], exportExcel);
router.get("/renderQR", [isAuthentication], renderQR);
router.post("/readQRAndAddFriend", [isAuthentication], readQR);


router.get("/getFriends/:id", [isAuthentication], getFriends);
router.get("/getCoin/:id", [isAuthentication], getCoin);

router.post("/importExcel", [isAuthentication], importExcel);
router.post("/forgotPassword", forgotPassword);
router.post("/changePassword", changePassword);

router.get("/suggest", [isAuthentication], getUserSuggest);
router.get("/profile/:id", [isAuthentication], getProfileUser);

router.get("/callVideo/:id", [isAuthentication], getTokenVideo);
router.get("/", [isAuthentication, isAdmin], getListUser);
router.get("/home", [isAuthentication], getUserHome);

router.get("/trash", [isAuthentication, isAdmin], getUserTrash);
router.get("/:id", [isAuthentication], getUser);
router.patch("/restore/:id", [isAuthentication, isAdmin], restoreUser);
router.patch("/changeAvatar/:id", [isAuthentication], changeAvatar);
router.patch("/changeBackground/:id", [isAuthentication], changeBackground);
router.patch("/updateDescription/:id", [isAuthentication], updateDescription);

router.patch("/:id", [isAuthentication, isAdmin], UpdateUser);

router.post("/", [isAuthentication, isAdmin], createUser);
router.delete("/force/:id", [isAuthentication, isAdmin], DeleteUserForce);

router.delete("/:id", [isAuthentication, isAdmin], DeleteUser);

module.exports = router;
