const {
  loginAuthService,
  registerService,
} = require("../services/AuthServices");

const login = async (req, res) => {
  try {
    return loginAuthService(req, res);
  } catch (e) {
    console.log(e);
    res.status(500).send("Lỗi server");
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
module.exports = {
  login,
  register,
};
