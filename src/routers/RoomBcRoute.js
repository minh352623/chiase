const express = require("express");
const {
  createRoom,
  getAllRoom,
  getDetail,
  changeStatusBlockRoom,
  deleteRoom,
  joinRoom,
  exitRoom,
  readyStart,
  startGame,
} = require("../controllers/RoomBcController");

const { isAuthentication, isAdmin } = require("../Middeware/AuthMiddleware");

let router = express.Router();

router.post("/createRoom", [isAuthentication], createRoom);
router.get("/joinRoom/:id_room/:password", [isAuthentication], joinRoom);

router.get("/getAll", [isAuthentication], getAllRoom);
router.get("/getDetail/:code_room", [isAuthentication], getDetail);

router.patch(
  "/changeStatusBlockRoom/:code_room",
  [isAuthentication],
  changeStatusBlockRoom
);
router.patch("/exitRoom/:code_room", [isAuthentication], exitRoom);
router.patch("/readyStart/:code_room", [isAuthentication], readyStart);
router.patch("/startGame/:code_room", [isAuthentication], startGame);

router.delete("/deleteRoom/:code_room", [isAuthentication], deleteRoom);

module.exports = router;
