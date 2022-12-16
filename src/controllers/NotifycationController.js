const {
  getNotifycationUserService,
  readNotisService,
} = require("../services/NotifycationService");

const getNotifycationUser = (req, res, next) => {
  try {
    return getNotifycationUserService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const readNotis = (req, res) => {
  try {
    return readNotisService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

module.exports = {
  getNotifycationUser,
  readNotis,
};
