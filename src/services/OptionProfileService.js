const { Op } = require("sequelize");
const db = require("../models");
const per_page = 5;
const getOptionProfileService = async (req, res) => {
  try {
    console.log("page", req.query.page);
    let offset = (req.query.page - 1) * per_page;
    let keyword = req.query.keyword || "";
    let count = 0;
    count = await db.Option_Profile.count();
    let optionProfile = await db.Option_Profile.findAll({
      limit: per_page,
      offset: offset,
      where: {
        key: {
          [Op.substring]: keyword,
        },
      },
      include: [{ model: db.Cate_Profile, as: "cate_data" }],
      order: [["createdAt", "DESC"]],
    });
    optionProfile.per_page = per_page;
    optionProfile.count = count;
    let data = {
      data: optionProfile,
      per_page: per_page,
      count: count,
    };
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).send(e);
  }
};

const addOptionProfileService = async (req, res, next) => {
  try {
    const optionCate = await db.Option_Profile.create({
      key: req.body?.key,
      cate_id: req.body?.cate,
    });
    return res.status(200).json(optionCate);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
const deleteOptionService = async (req, res) => {
  try {
    const optionProfile = await db.Option_Profile.findByPk(req.params.id);
    if (!optionProfile) return res.status(404).send("OPTION NOT FOUND");
    await optionProfile.destroy({});
    return res.status(200).send(optionProfile);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const getDetailOptionService = async (req, res, next) => {
  try {
    const optionProfile = await db.Option_Profile.findByPk(req.params.id);
    if (!optionProfile) return res.status(404).send("OPTION PROFILE NOT FOUND");
    return res.status(200).send(optionProfile);
  } catch (e) {
    return res.status(500).send(e);
  }
};
const UpdateOptionService = async (req, res) => {
  try {
    const option = await db.Option_Profile.findByPk(req.params.id);
    if (option) {
      if (req.body.key) {
        option.key = req.body.key;
      }
      if (req.body.cate) {
        option.cate_id = req.body.cate;
      }
      await option.save();
      return res.status(200).send("Update Option successfully");
    } else {
      return res.status(400, "Option not found");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
};
const getOptionProfileCateService = async (req, res) => {
  try {
    const options = await db.Option_Profile.findAll({
      where: {
        cate_id: req.params.id,
      },
      include: [{ model: db.Profile_User, as: "profile_data" }],
    });
    return res.status(200).json(options);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

module.exports = {
  getOptionProfileService,
  addOptionProfileService,
  deleteOptionService,
  getDetailOptionService,
  UpdateOptionService,
  getOptionProfileCateService,
};
