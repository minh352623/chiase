const {
  createCommentService,
  createLikeCommentService,
} = require("../services/CommentService");

const createComment = (req, res) => {
  try {
    const file = req?.files?.file || "";

    return createCommentService(req, res, file);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const createLikeComment = (req, res) => {
  try {
    return createLikeCommentService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

module.exports = {
  createComment,
  createLikeComment,
};
