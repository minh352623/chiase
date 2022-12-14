const db = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
require("dotenv").config();
const XLSX = require("xlsx");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mailer");

let per_page = 3;
let getPaginateUser = async (req, res) => {
  try {
    let offset = (req.query.page - 1) * per_page;
    let keyword = req.query.keyword || "";
    let genderSearch = +req.query?.gender?.trim() || null;
    let Users;
    if (req.query.group) {
      Users = await db.User.findAndCountAll({
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
            {
              "$group_data.id$": req.query?.group,
            },
          ],
        },
        include: [
          {
            model: db.Group_User,
            as: "group_data",
            attributes: ["name", "id"],

            required: true,
          },
        ],
      });
    } else {
      Users = await db.User.findAndCountAll({
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
          {
            model: db.Group_User,
            as: "group_data",
            attributes: ["name", "id"],

            required: true,
          },
        ],
      });
    }
    Users.per_page = per_page;
    Users.gender = genderSearch;

    return res.status(200).json(Users);
  } catch (e) {
    console.log(e);
  }
};
const getUserTrashService = async (req, res) => {
  try {
    let offset = (req.query.page - 1) * per_page;
    let keyword = req.query.keyword || "";
    let genderSearch = +req.query?.gender?.trim() || null;
    const count = await db.User.count({
      where: {
        deletedAt: {
          [Op.ne]: null,
        },
      },
      paranoid: false,
    });
    let users;
    if (!req.query.group) {
      users = await db.User.findAll({
        limit: per_page,
        offset: offset,
        where: {
          deletedAt: {
            [Op.ne]: null,
          },
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
            {
              // "$group_data.id$": req.query?.group,
            },
          ],
        },
        include: [
          {
            model: db.Group_User,
            as: "group_data",
            attributes: ["name", "id"],

            required: true,
          },
        ],
        paranoid: false,
      });
    } else {
      users = await db.User.findAll({
        limit: per_page,
        offset: offset,
        where: {
          deletedAt: {
            [Op.ne]: null,
          },
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
            {
              "$group_data.id$": req.query?.group,
            },
          ],
        },
        include: [
          {
            model: db.Group_User,
            as: "group_data",
            attributes: ["name", "id"],

            required: true,
          },
        ],
        paranoid: false,
      });
    }
    users.per_page = per_page;
    users.count = count;
    let data = {
      data: users,
      per_page: per_page,
      count: count,
    };
    return res.status(200).send(data);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
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
      await user.destroy({});
      return res.status(200).json("Delete user successful");
    }
    return res.status(404).send("USER NOT FOUND");
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.message);
  }
};
const DeleteUserForceService = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await db.User.findOne({
      where: {
        id: id,
      },
      paranoid: false,
    });
    console.log(user);
    if (!user) {
      return res.status(404).send("USER NOT FOUND");
    }
    await user.destroy({
      force: true,
    });
    return res.status(200).json("Delete user successful");
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
const restoreUserService = async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: req.params.id,
      },
      paranoid: false,
    });
    if (!user) return res.status(404).send("USER NOT FOUND");

    await user.restore();

    return res.status(200).send("RESTORE USER SUCCESSFULLY");
  } catch (e) {
    return res.status(500).send(e);
  }
};
const exportExcelService = async (req, res) => {
  try {
    const users = await db.User.findAll({
      paranoid: false,
    });
    return res.status(200).send(users);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
const importExcelService = async (req, res, file) => {
  try {
    const workbook = XLSX.readFile(file.tempFilePath);
    const workSheet = workbook.Sheets[workbook.SheetNames[0]];
    const userArr = [];
    for (let index = 2; index < 7; index++) {
      let hash =
        workSheet[`E${index}`]?.v &&
        hashPassword((workSheet[`E${index}`]?.v).toString());
      const user = {
        firstName: workSheet[`B${index}`]?.v,
        lastName: workSheet[`C${index}`]?.v,
        email: workSheet[`D${index}`]?.v,
        password: hash,
        gender: workSheet[`F${index}`]?.v,
        phone: workSheet[`G${index}`]?.v,
        address: workSheet[`H${index}`]?.v,
        group_id: workSheet[`I${index}`]?.v,
      };
      if (
        user.firstName &&
        user.lastName &&
        user.email &&
        user.password &&
        user.group_id &&
        user.gender
      ) {
        userArr.push(user);
      }
    }

    if (userArr.length > 0) {
      console.log(userArr);
      const importUsers = await db.User.bulkCreate(userArr, {
        ignoreDuplicates: true,
      });
      return res.status(200).send("import excel successfully imported");
    }
    return res.status(404).send("file excel not found");
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

const getUserSuggestService = async (req, res) => {
  try {
    const users = await db.User.findAll({
      limit: 4,
      where: {
        group_id: 1,
        id: {
          [Op.ne]: req.userId,
        },
      },
      // paranoid: false,
    });

    return res.status(200).send(users);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
const getProfileUserService = async (req, res) => {
  try {
    const profile = await db.User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!profile) return res.status(404).send("USER NOT FOUND");

    return res.status(200).send(profile);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

const changeAvatarService = async (req, res, avatar) => {
  try {
    const id = req.params.id;

    const user = await db.User.findByPk(id);
    if (!user) return res.status(404).send("USER NOT FOUND");
    let avatarnew = "";
    if (avatar.tempFilePath) {
      const info = await cloudinary.v2.uploader.upload(avatar.tempFilePath, {
        folder: "home",
      });
      avatarnew = info.url;
    }
    if (avatarnew) {
      user.avatar = avatarnew;
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: "Avatar updated successfully",
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};
const changeBackgroundService = async (req, res, bg_img) => {
  try {
    const id = req.params.id;

    const user = await db.User.findByPk(id);
    if (!user) return res.status(404).send("USER NOT FOUND");
    let bg_imgNew = "";
    if (bg_img.tempFilePath) {
      const info = await cloudinary.v2.uploader.upload(bg_img.tempFilePath, {
        folder: "home",
      });
      bg_imgNew = info.url;
    }
    if (bg_imgNew) {
      user.bg_img = bg_imgNew;
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: "Background updated successfully",
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

const updateDescriptionService = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).send("USER NOT FOUND");
    if (!req.body.desc) return res.status(404).send("DESCRIPTION NOT FOUND");
    user.description = req.body.desc;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Description updated successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

const getFriendsService = async (req, res) => {
  try {
    const friends = await db.Friend.findAll({
      where: {
        [Op.or]: [{ sender: req.params.id }, { recie: req.params.id }],
      },
    });
    return res.status(200).send(friends);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const createTokenGoogleService = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).send("USER NOT FOUND");
    const jwtToken = jwt.sign({ ...user }, process.env.SECRET_JWT, {
      expiresIn: 3600,
    });
    return res.status(200).send({
      accessToken: jwtToken,
    });
  } catch (e) {
    return res.status(500).send;
  }
};

const forgotPasswordService = async (req, res) => {
  try {
    if (!req.body.email) return res.status(404).send("EMAIL NOT FOUND");

    const salt = bcrypt.genSaltSync(10);
    const hashEmail = bcrypt.hashSync(req.body.email, salt);
    await sendMail(
      req.body.email,
      "Reset Password",
      `
      <div style="text-align:start;border:1px solid #ccc;padding:12px;">
      <p style="padding:24px;border-bottom:1px solid #ccc;margin:0;text-align:center;font-weight:bold;font-size:35px;color:black;">
          From Website <span style="color:red">Chiase.com</span>
      </p>
      <h4>Hi ${req.body.email}</h4>
      <h4>B???n qu??n m???t kh???u?</h4>
      <h4>Ch??ng t??i tr??? l???i cho y??u c???u thay ?????i m???t kh???u c???a b???n!</h4>

      <h3>Ch??ng t??i g???i Link x??c nh???n ?????i m???t kh???u. N???u kh??ng ph???i l?? b???n vui l??ng b??o c??o v???i ch??ng t??i ngay!</h3>
      
      <a style="padding:4px 8px;background-color:gray;color:white; text-decoration:none;border-radius:8px;font-size:18px;" href="${process.env.URL_CLIENT}/password/reset/?email=${req.body.email}&token=${hashEmail}">
      X??c nh???n
      </a>
      </div>`
    );

    return res.status(201).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

const changePasswordService = async (req, res) => {
  try {
    if (!req.body.password) return res.status(400).send("PASSWORD NOT FOUND");
    const isEamilValid = bcrypt.compareSync(
      req.body.email,
      req.body.tokenEmail
    );

    if (!isEamilValid) {
      return res.status(400).send("Email v?? m?? k??m theo kh??ng kh???p");
    }

    const user = await db.User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) return res.status(400).send("USER NOT FOUND");
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    user.password = hash;
    await user.save();
    return res.status(201).json({
      success: true,
    });
  } catch (e) {
    console.log(e);
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
  getUserTrashService,
  restoreUserService,
  DeleteUserForceService,
  exportExcelService,
  importExcelService,
  getUserSuggestService,
  getProfileUserService,
  changeAvatarService,
  changeBackgroundService,
  updateDescriptionService,
  getFriendsService,
  createTokenGoogleService,
  forgotPasswordService,
  changePasswordService,
};
