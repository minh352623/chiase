const { Op } = require("sequelize");
const db = require("../models");

const createHistorySearchService = async (req, res) => {
  try {
    const historyCount = await db.Search_History.count({
      where: {
        user_id: req.userId,
      },
    });
    if (historyCount >= 10) {
      const history = await db.Search_History.findOne({
        where: {
          user_id: req.userId,
        },
      });
      await history.destroy();
    }

    const newHistory = await db.Search_History.create({
      user_id: req.userId,
      keyword: req.body.keyword,
    });

    return res.status(201).json({
      success: true,
      data: newHistory,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).send(e);
  }
};

const getSuggestUserService = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    // if(keyword)
    const historys = await db.Search_History.findAll({
      where: {
        user_id: req.userId,
        keyword: {
          [Op.substring]: keyword,
        },
      },
      order: [["id", "DESC"]],
    });
    return res.status(200).json(historys);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

module.exports = {
  createHistorySearchService,
  getSuggestUserService,
};
