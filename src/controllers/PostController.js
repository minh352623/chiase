const {
  createPostService,
  getPostHomeService,
  getPostAdminService,
  getDetailPostService,
  deletePostService,
  updatePostService,
} = require("../services/PostService");

const createPost = async (req, res) => {
  try {
    return createPostService(req, res);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const getPostHome = (req, res) => {
  try {
    return getPostHomeService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const getPostAdmin = (req, res) => {
  try {
    return getPostAdminService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const getDetailPost = (req, res) => {
  try {
    return getDetailPostService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};
const deletePost = (req, res) => {
  try {
    return deletePostService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const UpdatePost = (req, res) => {
  try {
    return updatePostService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};
module.exports = {
  createPost,
  getPostHome,
  getPostAdmin,
  UpdatePost,
  getDetailPost,
  deletePost,
};
