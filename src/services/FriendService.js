const { Op } = require("sequelize");
const db = require("../models");

const addFriendService = async (req, res) => {
  try {
    console.log(req.body);
    const refFriend = await db.friend.findOne({
      where: {
        [Op.or]: [
          {
            sender: req.body.sender,
            recie: req.body.recie,
          },
          {
            sender: req.body.recie,
            recie: req.body.sender,
          },
        ],
      },
    });
    if (refFriend)
      return res.status(200).json({
        success: true,
        friend: refFriend,
      });

    const newFriend = await db.friend.create({
      sender: req.body.sender,
      recie: req.body.recie,
      status: 1,
    });
    const notifycationNew = await db.notifycation.create({
      user_id: req.body.recie,
      text: req.body.text,
      avatar: req.body.avatar,
    });
    return res.status(200).json({
      success: true,
      friend: newFriend,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
const acceptFriendService = async (req, res) => {
  try {
    const friend = await db.friend.findByPk(req.params.id);
    if (!friend) return res.status(404).send("FRIEND NOT FOUND");
    friend.status = 2;
    await friend.save();
    const notifycationNew = await db.notifycation.create({
      user_id: req.body.recie,
      text: req.body.text,
      avatar: req.body.avatar,
    });
    return res.status(200).json({
      success: true,
      friend: friend,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};
const refuseFriendService = async (req, res) => {
  try {
    const friend = await db.friend.findByPk(req.params.id);
    if (!friend) return res.status(200).send("DELETE FRIEND SUCCESSFUL");
    await friend.destroy();
    return res.status(200).json({
      success: "DELETE SUCCESSFULLY",
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};
const getRequestFriendService = async (req, res) => {
  try {
    const requestFriend = await db.friend.findAll({
      where: {
        recie: req.params.id,
        status: 1,
      },
      include: [{ model: db.user, as: "sender_data" }],
    });

    return res.status(200).json(requestFriend);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const getAcceptFriendService = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    console.log(keyword);
    const friends = await db.friend.findAll({
      where: {
        status: 2,
        [Op.or]: [{ sender: req.params.id }, { recie: req.params.id }],
        [Op.and]: [
          {
            [Op.or]: [
              {
                "$sender_data.firstName$": {
                  [Op.substring]: keyword,
                },
              },
              {
                "$sender_data.lastName$": {
                  [Op.substring]: keyword,
                },
              },
              {
                "$sender_data.email$": {
                  [Op.substring]: keyword,
                },
              },
              {
                "$sender_data.phone$": {
                  [Op.substring]: keyword,
                },
              },
              {
                "$sender_data.address$": {
                  [Op.substring]: keyword,
                },
              },
              {
                "$recie_data.firstName$": {
                  [Op.substring]: keyword,
                },
              },
              {
                "$recie_data.lastName$": {
                  [Op.substring]: keyword,
                },
              },
              {
                "$recie_data.email$": {
                  [Op.substring]: keyword,
                },
              },
              {
                "$recie_data.phone$": {
                  [Op.substring]: keyword,
                },
              },
              {
                "$recie_data.address$": {
                  [Op.substring]: keyword,
                },
              },
            ],
          },
        ],
      },
      include: [
        { model: db.user, as: "sender_data" },
        { model: db.user, as: "recie_data" },
      ],
    });

    return res.status(200).json(friends);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

const getFriendSearchService = async (req, res) => {
  try {
    const keyword = req.query.q || "";

    const users = await db.user.findAll({
      where: {
        id: {
          [Op.ne]: req.userId,
        },
        [Op.and]: [
          {
            [Op.or]: [
              {
                firstName: {
                  [Op.substring]: keyword,
                },
              },
              {
                lastName: {
                  [Op.substring]: keyword,
                },
              },
              {
                email: {
                  [Op.substring]: keyword,
                },
              },
              {
                phone: {
                  [Op.substring]: keyword,
                },
              },
              {
                address: {
                  [Op.substring]: keyword,
                },
              },
            ],
          },
        ],
      },
      include: [{ model: db.profile_user, as: "profile_data" }],
    });
    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).send(e);
  }
};

module.exports = {
  addFriendService,
  acceptFriendService,
  refuseFriendService,
  getRequestFriendService,
  getAcceptFriendService,
  getFriendSearchService,
};
