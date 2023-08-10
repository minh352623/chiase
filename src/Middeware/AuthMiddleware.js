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
    const user = await db.user.findByPk(userId);
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
const online_user_email = async (req, res, next) => {
  try {
    const user = await db.user.findOne({
      where: { email: req.body.email },
    });

    if (user.id) {
      try {
        const user_online = await db.user_online.findOne({
          where: {
            user_id: user.id,
          },
        });
        const devices = [];
        devices.push({
          device: req.get("User-Agent"),
          date_login: new Date(),
        });
        if (!user_online) {
          const new_user_online = await db.user_online.create({
            user_id: user.id,
            total_login: 1,
            devices: JSON.stringify(devices),
          });
        } else {
          console.log(user_online);
          user_online.updatedAt = new Date();
          user_online.total_login = user_online.total_login + 1;
          user_online.devices = JSON.stringify([
            ...JSON.parse(user_online.devices),
            {
              device: req.get("User-Agent"),
              date_login: new Date(),
            },
          ]);

          await user_online.save();
          next();
        }
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log("🚀 ~ file: AuthMiddleware.js:86 ~ constonline_user_email= ~ e:", e)
    console.log("loi check admin");
  }
};
const online_user_id = async (req, res, next) => {
  try {
    const user = await db.user.findByPk(req.params.id);

    if (user.id) {
      try {
        const user_online = await db.user_online.findOne({
          where: {
            user_id: user.id,
          },
        });
        const devices = [];
        devices.push({
          device: req.get("User-Agent"),
          date_login: new Date(),
        });
        if (!user_online) {
          const new_user_online = await db.user_online.create({
            user_id: user.id,
            total_login: 1,
            devices: JSON.stringify(devices),
          });
        } else {
          console.log(user_online);
          user_online.updatedAt = new Date();
          user_online.total_login = user_online.total_login + 1;
          user_online.devices = JSON.stringify([
            ...JSON.parse(user_online.devices),
            {
              device: req.get("User-Agent"),
              date_login: new Date(),
            },
          ]);

          await user_online.save();
        }
        next();
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log("🚀 ~ file: AuthMiddleware.js:131 ~ constonline_user_id= ~ e:", e)
    console.log("loi check admin");
  }
};
module.exports = {
  isAuthentication: isAuthentication,
  isAdmin: isAdmin,
  online_user_email,
  online_user_id,
};
