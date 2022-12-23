const express = require("express");
const {
  createOption,
  getOptionAdmin,
  deleteOption,
  getAllOption,
  getDetail,
  UpdateOption,
} = require("../controllers/OptionReportController");

const { isAuthentication, isAdmin } = require("../Middeware/AuthMiddleware");

let router = express.Router();

router.post("/", [isAuthentication, isAdmin], createOption);
router.get("/", [isAuthentication, isAdmin], getOptionAdmin);
router.get("/getAll", [isAuthentication], getAllOption);
router.get("/detail/:id", [isAuthentication], getDetail);
router.patch("/:id", [isAuthentication, isAdmin], UpdateOption);

router.delete("/:id", [isAuthentication, isAdmin], deleteOption);

module.exports = router;
