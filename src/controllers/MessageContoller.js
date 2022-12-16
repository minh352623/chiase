const {
  getMessagesService,
  createMessageService,
} = require("../services/MeesageService");

const getMessages = (req, res) => {
  try {
    return getMessagesService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const createMessage = (req, res) => {
  try {
    return createMessageService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

module.exports = {
  getMessages,
  createMessage,
};
