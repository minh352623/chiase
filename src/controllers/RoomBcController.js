const {
  createRoomService,
  getAllService,
  getDetailRoomService,
  changeStatusBlockRoomService,
  deleteRoomService,
  joinRoomService,
  exitRoomService,
  readyStartService,
  startGameService,
} = require("../services/RoomBcService");

const createRoom = (req, res) => {
  try {
    return createRoomService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const getAllRoom = (req, res) => {
  try {
    return getAllService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const getDetail = (req, res) => {
  try {
    return getDetailRoomService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const changeStatusBlockRoom = (req, res) => {
  try {
    return changeStatusBlockRoomService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const deleteRoom = (req, res) => {
  try {
    return deleteRoomService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const joinRoom = (req, res) => {
  try {
    return joinRoomService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const exitRoom = (req, res) => {
  try {
    return exitRoomService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const readyStart = (req, res) => {
  try {
    return readyStartService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const startGame = (req, res) => {
  try {
    return startGameService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

module.exports = {
  createRoom,
  getAllRoom,
  getDetail,
  changeStatusBlockRoom,
  deleteRoom,
  joinRoom,
  exitRoom,
  readyStart,
  startGame,
};
