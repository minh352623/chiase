const {
  loginAuthService,
  registerService,
  createTokenFacebookService,
  createTokenGithubService,
  loginWithFaceIDService,
} = require("../services/AuthServices");

const login = async (req, res) => {
  try {
    return loginAuthService(req, res);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Lỗi server");
  }
};
const register = async (req, res) => {
  try {
    return registerService(req, res);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

const createTokenFacebook = (req, res) => {
  try {
    return createTokenFacebookService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};
const createTokenGithub = (req, res) => {
  try {
    return createTokenGithubService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const loginWithFaceID = (req, res) => {
  try {
    return loginWithFaceIDService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

module.exports = {
  login,
  register,
  createTokenFacebook,
  createTokenGithub,
  loginWithFaceID,
};
