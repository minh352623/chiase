const { Op } = require("sequelize");
const db = require("../models");

const flexHeaderService = async (req, res) => {
  try {
    const totalAccount = await db.user.count();
    const totalPost = await db.post.count();
    const totalReport = await db.report.count();
    const totalGroup = await db.group_user.count();
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
    count = await db.user_online.count();
    const info = await db.user_online.findAll({
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
          model: db.user,
          as: "user_data",
          include: [
            {
              model: db.group_user,
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

    const info = await db.user_online.findAll({
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
          model: db.user,
          as: "user_data",
          include: [
            {
              model: db.group_user,
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

const addInfoDeviceUser = async (req,res) => {
  try{
    const infoUserOnline  = await db.user_online.findOne({
      where:{
        user_id: req?.userId
      }
    });
    if(!infoUserOnline) return res.status(404).json({"message" : "User not found"});
    const listDevice = JSON.parse(infoUserOnline.devices);
    console.log("🚀 ~ file: DashboardService.js:174 ~ addInfoDeviceUser ~ listDevice:", listDevice)
    listDevice.push(req.body.device);
    infoUserOnline.devices = JSON.stringify(listDevice);
    await infoUserOnline.save();
    return res.status(200).json({
      "message":"Save device successfully"
    });
  }catch (e) {
    console.log("🚀 ~ file: DashboardService.js:169 ~ addInfoDeviceUser ~ e:", e)
    
  }
}

module.exports = {
  flexHeaderService,
  manager_online_user_service,
  exportExcelInfoOnline_service,
  addInfoDeviceUser
};
