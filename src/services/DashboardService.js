const { Op } = require("sequelize");
const db = require("../models");

const flexHeaderService = async (req, res) => {
  try {
    const totalAccount = await db.User.count();
    const totalPost = await db.Post.count();
    const totalReport = await db.Report.count();
    const totalGroup = await db.Group_User.count();
    return res.status(200).json({
      totalAccount: totalAccount,
      totalGroup: totalGroup,
      totalReport: totalReport,
      totalPost: totalPost,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};
const per_page = 2;
const manager_online_user_service = async (req, res) => {
  try {
    let offset = (req.query.page - 1) * per_page;
    let count = 0;
    const keyword = req.query.keyword;
    count = await db.User_Online.count();
    const info = await db.User_Online.findAll({
      limit: per_page,
      offset: offset,
      order: [["createdAt", "DESC"]],
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              {
                "$user_data.firstName$": {
                  [Op.substring]: keyword,
                },
              },
              {
                "$user_data.lastName$": {
                  [Op.substring]: keyword,
                },
              },
              {
                "$user_data.email$": {
                  [Op.substring]: keyword,
                },
              },
              {
                "$user_data.address$": {
                  [Op.substring]: keyword,
                },
              },
              {
                "$user_data.phone$": {
                  [Op.substring]: keyword,
                },
              },
            ],
          },
        ],
      },
      include: [
        {
          model: db.User,
          as: "user_data",
          include: [
            {
              model: db.Group_User,
              as: "group_data",
              attributes: ["name", "id"],

              required: true,
            },
          ],
        },
      ],
    });
    info.per_page = per_page;
    info.count = count;
    let data = {
      data: info,
      per_page: per_page,
      count: count,
    };
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const exportExcelInfoOnline_service = async (req, res) => {
  try {
    const keyword = req.query.keyword;

    const info = await db.User_Online.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              {
                "$user_data.firstName$": {
                  [Op.substring]: keyword,
                },
              },
              {
                "$user_data.lastName$": {
                  [Op.substring]: keyword,
                },
              },
              {
                "$user_data.email$": {
                  [Op.substring]: keyword,
                },
              },
              {
                "$user_data.address$": {
                  [Op.substring]: keyword,
                },
              },
              {
                "$user_data.phone$": {
                  [Op.substring]: keyword,
                },
              },
            ],
          },
        ],
      },
      include: [
        {
          model: db.User,
          as: "user_data",
          include: [
            {
              model: db.Group_User,
              as: "group_data",
              attributes: ["name", "id"],

              required: true,
            },
          ],
        },
      ],
    });
    const newData = info.map((user) => {
      user.dataValues.fullname =
        user.user_data.firstName + " " + user.user_data.lastName;
      user.dataValues.phone = user.user_data.phone;
      user.dataValues.email = user.user_data.email;
      return user;
    });
    console.log(newData);
    return res.status(200).json(newData);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

module.exports = {
  flexHeaderService,
  manager_online_user_service,
  exportExcelInfoOnline_service,
};
