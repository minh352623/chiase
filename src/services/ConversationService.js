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
    const newData = await Promise.all(conversations.map(async (item) => {
      let id_user_conversation = 0;
    
      if (item.user_one != req.userId) {
        id_user_conversation = item.user_one;
      } else {
        id_user_conversation = item.user_second;
      }
    
      console.log("🚀 ~ file: ConversationService.js:61 ~ conversations.forEach ~ id_user_conversation:", id_user_conversation);
    
      item.dataValues.userConversation = await db.user.findOne({
        where: {
          id: id_user_conversation
        }
      });
    
      console.log("🚀 ~ file: ConversationService.js:75 ~ conversations.forEach ~ item:", item.dataValues);
      return item;
    }));
    return res.status(200).send(newData);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
module.exports = {
  createConversationService,
  getConversationService,
};
