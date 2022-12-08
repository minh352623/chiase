const express = require("express");
const {
  getListGroup,
  CreateGroup,
  getDetailGroup,
  UpdateGroup,
  DeleteGroup,
  getAll,
} = require("../controllers/GroupController");
const { isAuthentication, isAdmin } = require("../Middeware/AuthMiddleware");

let router = express.Router();
router.get("/", [isAuthentication, isAdmin], getListGroup);
router.get("/getAll", [isAuthentication, isAdmin], getAll);

router.get("/:id", [isAuthentication, isAdmin], getDetailGroup);
router.patch("/:id", [isAuthentication, isAdmin], UpdateGroup);

router.post("/", [isAuthentication, isAdmin], CreateGroup);
router.delete("/:id", [isAuthentication, isAdmin], DeleteGroup);

module.exports = router;
