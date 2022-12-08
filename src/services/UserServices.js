const db = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
let per_page = 3;
let getPaginateUser = async (req, res) => {
  try {
    let offset = (req.query.page - 1) * per_page;
    let keyword = req.query.keyword || "";
    let genderSearch = +req.query?.gender?.trim() || null;

    let Users = await db.User.findAndCountAll({
      limit: per_page,
      offset: offset,
      order: [["id", "DESC"]],
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              {
                firstName: {
                  [Op.substring]: keyword,
                },
              },
              {
                lastName: {
                  [Op.substring]: keyword,
                },
              },
              {
                email: {
                  [Op.substring]: keyword,
                },
              },
              {
                phone: {
                  [Op.substring]: keyword,
                },
              },
              {
                address: {
                  [Op.substring]: keyword,
                },
              },
            ],
          },
        ],
      },
      include: [
        { model: db.Group_User, as: "group_data", attributes: ["name"] },
      ],
    });
    Users.per_page = per_page;
    Users.gender = genderSearch;

    return res.status(200).json(Users);
  } catch (e) {
    console.log(e);
  }
};

let createUserService = async (req, res, avatar) => {
  try {
    let avatarnew = "";
    if (avatar.tempFilePath) {
      const info = await cloudinary.v2.uploader.upload(avatar.tempFilePath, {
        folder: "home",
      });
      avatarnew = info.url;
    }
    console.log("ava " + avatarnew);
    // return res.status(200).send(avatarnew);

    let passwordHash = hashPassword(req.body.password);
    let user = await db.User.create({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      gender: req.body.gender == 1 ? true : false,
      email: req.body.email,
      avatar: avatarnew,
      password: passwordHash,
      phone: req.body.phone,
      address: req.body.address,
      group_id: req.body.role,
    });
    return res.status(200).send("Create user success");
  } catch (e) {
    return res.status(500).send("Create error" + e.message);
  }
};

let hashPassword = (password) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  } catch (e) {
    console.log(e);
    return null;
  }
};

let getUserService = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await db.User.findByPk(id);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.message);
  }
};

let updateUserService = async (req, res, avatar) => {
  try {
    let avatarnew = "";
    if (avatar.tempFilePath) {
      const info = await cloudinary.v2.uploader.upload(avatar.tempFilePath, {
        folder: "home",
      });
      avatarnew = info.url;
    }
    const id = req.params.id;
    const user = await db.User.findByPk(id);
    if (user) {
      if (avatarnew) {
        user.avatar = avatarnew;
      }
      if (req.body.password) {
        let hash = hashPassword(req.body.password);
        user.password = hash;
      }
      if (req.body.firstname) {
        user.firstName = req.body.firstname;
      }
      if (req.body.lastname) {
        user.lastName = req.body.lastname;
      }
      if (req.body.email) {
        user.email = req.body.email;
      }
      if (req.body.phone) {
        user.phone = req.body.phone;
      }
      if (req.body.addresses) {
        user.address = req.body.addresses;
      }
      if (req.body.role) {
        user.group_id = req.body.role;
      }
      if (req.body.gender) {
        user.gender = req.body.gender;
      }

      let userUpdate = await user.save();

      return res.status(200).json(userUpdate);
    } else {
      return res.status(500).send("User not found");
    }
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.message);
  }
};

let deleteUserService = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await db.User.findByPk(id);
    if (user) {
      await user.destroy({
        force: true,
      });
      return res.status(200).json("Delete user successful");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.message);
  }
};

const getUserHomeService = async (req, res) => {
  try {
    const users = await db.User.findAll({
      where: {
        id: {
          [Op.ne]: req.userId,
        },
      },
    });
    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).send(e);
  }
};

module.exports = {
  createUserService: createUserService,
  getPaginateUser: getPaginateUser,
  getUserService: getUserService,
  updateUserService: updateUserService,
  deleteUserService: deleteUserService,
  getUserHomeService,
};
