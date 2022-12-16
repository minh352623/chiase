const { createLikeService } = require("../services/LikeServices");

const createLike = (req, res, next) => {
  try {
    return createLikeService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

module.exports = { createLike };
