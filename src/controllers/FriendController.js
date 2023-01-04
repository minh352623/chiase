const {
  addFriendService,
  acceptFriendService,
  refuseFriendService,
  getRequestFriendService,
  getAcceptFriendService,
  getFriendSearchService,
} = require("../services/FriendService");

const addFriend = (req, res) => {
  try {
    return addFriendService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const acceptFriend = (req, res) => {
  try {
    return acceptFriendService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const refuseFriend = (req, res) => {
  try {
    return refuseFriendService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const getRequestFriend = (req, res) => {
  try {
    return getRequestFriendService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};
const getAcceptFriend = (req, res) => {
  try {
    return getAcceptFriendService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const getFriendSearch = (req, res) => {
  try {
    return getFriendSearchService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

module.exports = {
  addFriend,
  acceptFriend,
  refuseFriend,
  getRequestFriend,
  getAcceptFriend,
  getFriendSearch,
};
