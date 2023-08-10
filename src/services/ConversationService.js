const db = require("../models");
const { Op } = require("sequelize");

const createConversationService = async (req, res) => {
  try {
    const conversationOld = await db.conversation.findOne({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              {
                user_one: req.body.user_one,
              },
              {
                user_second: req.body.user_second,
              },
            ],
          },
          {
            [Op.and]: [
              {
                user_one: req.body.user_second,
              },
              {
                user_second: req.body.user_one,
              },
            ],
          },
        ],
      },
    });
    if (conversationOld) {
      return res.status(200).send("da co phong");
    } else {
      const conversation = await db.conversation.create({
        user_one: req.body.user_one,
        user_second: req.body.user_second,
      });
      return res.status(200).send(conversation);
    }
  } catch (e) {
    return res.status(500).send(e);
  }
};
const getConversationService = async (req, res) => {
  try {
    const conversations = await db.conversation.findAll({
      where: {
        [Op.or]: [{ user_one: req.userId }, { user_second: req.userId }],
      },
      include: [
        {
          model: db.message,
          as: "message_data",
        },
      ],
    });
    return res.status(200).send(conversations);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
module.exports = {
  createConversationService,
  getConversationService,
};
