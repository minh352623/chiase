const db = require("../models");
const { Op } = require("sequelize");

const getMessagesService = async (req, res) => {
  try {
    const messages = await db.Message.findAll({
      where: { id_conversation: req.params.idConversation },
      include: [{ model: db.User, as: "user_data" }],
    });
    return res.status(200).send(messages);
  } catch (e) {
    console.error(e);
    return res.status(500).send(e);
  }
};

module.exports = {
  getMessagesService,
};
