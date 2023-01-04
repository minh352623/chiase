const express = require("express");
const {
  addCateProfile,
  getCateProfile,
  deleteCate,
  getDetailCate,
  UpdateCate,
  getAll,
} = require("../controllers/CateProfileController");

const { isAuthentication, isAdmin } = require("../Middeware/AuthMiddleware");

let router = express.Router();

router.post("/", [isAuthentication], addCateProfile);
router.get("/getAll", [isAuthentication], getAll);

router.get("/", [isAuthentication], getCateProfile);
router.delete("/:id", [isAuthentication, isAdmin], deleteCate);
router.get("/:id", [isAuthentication, isAdmin], getDetailCate);
router.patch("/:id", [isAuthentication, isAdmin], UpdateCate);

module.exports = router;
