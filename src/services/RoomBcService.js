const db = require("../models");
const { v4 } = require("uuid");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { request } = require("http");
const { response } = require("express");

const createRoomService = async (req, res) => {
  try {
    const roomOld = await db.RoomBauCua.findOne({
      where: {
        own_room: req.userId,
      },
    });
    if (roomOld) {
      await db.UserRoomBC.destroy({
        where: {
          id_room: roomOld.id,
        },
      });
      await roomOld.destroy({});
    }
    const room = await db.RoomBauCua.create({
      own_room: req.userId,
      name: req.body.nameRoom,
      password: req.body.passRoom,
      size: req.body.sizeRoom,
      count_user: 1,
      blocked: 0,
      code_room: v4(),
    });
    if (!room) return res.status(500).send("DATABASE ERROR");
    const user_room = await db.UserRoomBC.create({
      user_id: req.userId,
      id_room: room.id,
      ready: 1,
    });

    return res.status(200).json({
      status: "success",
      data: room,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
const per_page = 6;
const getAllService = async (req, res) => {
  try {
    let offset = (req.query.page - 1) * per_page;
    let keyword = req.query.keyword || "";
    let count = 0;
    count = await db.RoomBauCua.count();
    let rooms = await db.RoomBauCua.findAll({
      limit: per_page,
      offset: offset,
      order: [["createdAt", "DESC"]],
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              {
                name: {
                  [Op.substring]: keyword,
                },
              },
            ],
          },
        ],
      },
      include: [
        {
          model: db.UserRoomBC,
          as: "user_room_data",
          include: [
            {
              model: db.User,
              as: "user_data",
              attributes: ["firstName", "lastName", "id", "avatar"],
            },
          ],
        },
      ],
    });

    rooms.per_page = per_page;
    rooms.count = count;
    let data = {
      data: rooms,
      per_page: per_page,
      count: count,
    };
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

const getDetailRoomService = async (req, res) => {
  try {
    const room = await db.RoomBauCua.findOne({
      where: {
        code_room: req.params.code_room,
      },
      include: [
        {
          model: db.UserRoomBC,
          as: "user_room_data",
          include: [
            {
              model: db.User,
              as: "user_data",
              attributes: ["firstName", "lastName", "id", "avatar", "coin"],
            },
          ],
        },
        {
          model: db.User,
          as: "own_data",
        },
      ],
    });
    if (!room) return res.status(400).json("Phòng không tồn tại");
    return res.status(200).json(room);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

const changeStatusBlockRoomService = async (req, res) => {
  try {
    const room = await db.RoomBauCua.findOne({
      where: {
        code_room: req.params.code_room,
      },
    });
    if (!room) return res.status(400).json("ROOM NOT FOUND");

    room.blocked = req.body.blocked;
    await room.save();
    const roomNew = await db.RoomBauCua.findOne({
      where: {
        code_room: req.params.code_room,
      },
      include: [
        {
          model: db.UserRoomBC,
          as: "user_room_data",
          include: [
            {
              model: db.User,
              as: "user_data",
              attributes: ["firstName", "lastName", "id", "avatar", "coin"],
            },
          ],
        },
        {
          model: db.User,
          as: "own_data",
        },
      ],
    });
    return res.status(200).json(roomNew);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const deleteRoomService = async (req, res) => {
  try {
    const room = await db.RoomBauCua.findOne({
      where: {
        code_room: req.params.code_room,
      },
      include: [
        {
          model: db.UserRoomBC,
          as: "user_room_data",
        },
      ],
    });
    if (!room) return res.status(400).json("ROOM NOT FOUND");
    await db.UserRoomBC.destroy({
      where: {
        id_room: room?.id,
      },
    });
    await room.destroy();
    return res.status(200).json(room);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const joinRoomService = async (req, res) => {
  try {
    const room = await db.RoomBauCua.findOne({
      where: {
        id: req.params.id_room,
      },
      include: [
        {
          model: db.UserRoomBC,
          as: "user_room_data",
        },
      ],
    });
    if (!room) return res.status(404).json("ROOM NOT FOUND");
    if (room.blocked === 1) return res.status(400).json("Phòng này đã khóa!");
    if (+room.size === +room.count_user)
      return res.status(400).json("Phòng đã đầy!");
    if (room.started == 1) return res.status(400).json("Phòng đã bắt đầu!");

    if (room.password !== req.params.password)
      return res.status(400).json("Mật khẩu không đúng!");
    room.count_user = +room.count_user + 1;
    await room.save();
    await db.UserRoomBC.create({
      user_id: req.userId,
      id_room: room.id,
    });

    return res.status(200).json(room);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

const exitRoomService = async (req, res) => {
  try {
    const room = await db.RoomBauCua.findOne({
      where: {
        code_room: req.params.code_room,
      },
      include: [
        {
          model: db.UserRoomBC,
          as: "user_room_data",
        },
      ],
    });
    if (!room) return res.status(400).json("ROOM NOT FOUND");
    await db.UserRoomBC.destroy({
      where: {
        user_id: req.userId,
        id_room: room.id,
      },
    });
    room.count_user = +room.count_user - 1;
    await room.save();
    return res.status(200).json(room);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const readyStartService = async (req, res) => {
  try {
    const room = await db.RoomBauCua.findOne({
      where: {
        code_room: req.params.code_room,
      },
    });
    if (!room) return res.status(400).json("ROOM NOT FOUND");
    const user_room = await db.UserRoomBC.findOne({
      where: {
        user_id: req.userId,
        id_room: room.id,
      },
    });
    if (!user_room) return res.status(400).json("USER NOT FOUND");
    user_room.ready = req.query.status;
    await user_room.save();
    const newRoom = await db.RoomBauCua.findOne({
      where: {
        code_room: req.params.code_room,
      },
      include: [
        {
          model: db.UserRoomBC,
          as: "user_room_data",
          include: [
            {
              model: db.User,
              as: "user_data",
              attributes: ["firstName", "lastName", "id", "avatar", "coin"],
            },
          ],
        },
        {
          model: db.User,
          as: "own_data",
        },
      ],
    });
    return res.status(200).json(newRoom);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

const startGameService = async (req, res) => {
  try {
    const room = await db.RoomBauCua.findOne({
      where: {
        code_room: req.params.code_room,
      },
      include: [
        {
          model: db.UserRoomBC,
          as: "user_room_data",
          include: [
            {
              model: db.User,
              as: "user_data",
              attributes: ["firstName", "lastName", "id", "avatar", "coin"],
            },
          ],
        },
        {
          model: db.User,
          as: "own_data",
        },
      ],
    });
    if (!room) return res.status(404).json("Phòng không tồn tại");
    if (room.user_room_data.length < 2)
      return res
        .status(400)
        .json("Số lượng bắt buộc là 2 người chơi vui lòng mời thêm bạn bè!");
    const userNotReady = await db.UserRoomBC.findOne({
      where: {
        id_room: room.id,
        ready: 0,
      },
    });
    if (userNotReady)
      return res.status(400).json("Có người chơi chưa sẵn sàng");

    room.started = 1;
    await room.save();
    return res.status(200).json(room);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

module.exports = {
  createRoomService,
  getAllService,
  getDetailRoomService,
  changeStatusBlockRoomService,
  deleteRoomService,
  joinRoomService,
  exitRoomService,
  readyStartService,
  startGameService,
};
