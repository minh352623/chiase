const express = require("express");
const {
  getOptionProfile,
  addOptionProfile,
  deleteOption,
  getDetailOption,
  UpdateOption,
  getOptionProfileCate,
} = require("../controllers/OptionProfileController");

const { isAuthentication, isAdmin } = require("../Middeware/AuthMiddleware");

let router = express.Router();

router.post("/", [isAuthentication, isAdmin], addOptionProfile);
router.get("/", [isAuthentication, isAdmin], getOptionProfile);

router.get("/cate/:id", [isAuthentication], getOptionProfileCate);

router.delete("/:id", [isAuthentication, isAdmin], deleteOption);
router.get("/:id", [isAuthentication, isAdmin], getDetailOption);
router.patch("/:id", [isAuthentication, isAdmin], UpdateOption);

module.exports = router;
