const {
  createConversationService,
  getConversationService,
} = require("../services/ConversationService");

const createConversation = (req, res) => {
  try {
    return createConversationService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const getConversation = (req, res) => {
  try {
    return getConversationService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

module.exports = {
  createConversation,
  getConversation,
};
