const db = require("../models");
const { Op } = require("sequelize");

const getMessagesService = async (req, res) => {
  try {
    const messages = await db.message.findAll({
      where: { id_conversation: req.params.idConversation },
      include: [{ model: db.user, as: "user_data" }],
    });
    return res.status(200).send(messages);
  } catch (e) {
    console.error(e);
    return res.status(500).send(e);
  }
};
const createMessageService = async (req, res) => {
  try {
    const message = await db.message.create(req.body);
    return res.status(200).send(message);
  } catch (e) {
    return res.status(500).send(e);
  }
};

module.exports = {
  getMessagesService,
  createMessageService,
};
