const { getMessagesService } = require("../services/MeesageService");

const getMessages = (req, res) => {
  try {
    return getMessagesService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

module.exports = {
  getMessages,
};
