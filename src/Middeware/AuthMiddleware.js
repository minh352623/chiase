const jwt = require("jsonwebtoken");
const db = require("../models");

const isAuthentication = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    const access_token = bearerHeader.split(" ")[1];
    const decodeJwt = jwt.verify(
      access_token,
      process.env.SECRET_JWT
    ).dataValues;
    console.log("check auth");
    req.userId = decodeJwt.id; //gán id cho req sau
    next();
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      console.log("token het han");
      return res.status(401).send("Token expired");
    }

    return res.status(401).send("Authentication not valid");
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await db.User.findByPk(userId);
    if (+user?.group_id == 1) {
      console.log("check admin");
      next();
    } else {
      console.log("token khong phai admin");

      return res.status(401).send("Authentication not admin ne");
    }
  } catch (e) {
    console.log("loi check admin");
    return res.status(401).send("Authentication not valid");
  }
};

module.exports = {
  isAuthentication: isAuthentication,
  isAdmin: isAdmin,
};
