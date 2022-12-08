const express = require("express");
const {
  getListUser,
  createUser,
  getUser,
  UpdateUser,
  DeleteUser,
  getUserHome,
} = require("../controllers/userController");

const { isAuthentication, isAdmin } = require("../Middeware/AuthMiddleware");

let router = express.Router();
router.get("/", [isAuthentication, isAdmin], getListUser);
router.get("/home", [isAuthentication], getUserHome);

router.get("/:id", [isAuthentication], getUser);
router.patch("/:id", [isAuthentication, isAdmin], UpdateUser);

router.post("/", [isAuthentication, isAdmin], createUser);
router.delete("/:id", [isAuthentication, isAdmin], DeleteUser);

module.exports = router;
