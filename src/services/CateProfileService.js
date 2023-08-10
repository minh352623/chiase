const { Op } = require("sequelize");
const db = require("../models");
const per_page = 2;
const addCateProfileService = async (req, res) => {
  try {
    const cateProfile = await db.cate_profile.create({
      name: req.body?.name,
    });
    return res.status(200).json(cateProfile);
  } catch (e) {
    return res.status(500).send(e);
  }
};
const getAllService = async (req, res) => {
  try {
    const cates = await db.cate_profile.findAll();
    return res.status(200).json(cates);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
const getCateProfileService = async (req, res) => {
  try {
    console.log("page", req.query.page);
    let offset = (req.query.page - 1) * per_page;
    let keyword = req.query.keyword || "";
    let count = 0;
    count = await db.cate_profile.count();
    let cateProfile = await db.cate_profile.findAll({
      limit: per_page,
      offset: offset,
      where: {
        name: {
          [Op.substring]: keyword,
        },
      },
      order: [["createdAt", "DESC"]],
    });
    cateProfile.per_page = per_page;
    cateProfile.count = count;
    let data = {
      data: cateProfile,
      per_page: per_page,
      count: count,
    };
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const deleteCateService = async (req, res) => {
  try {
    const cateProfile = await db.cate_profile.findByPk(req.params.id);
    if (!cateProfile) return res.status(404).send("CATE NOT FOUND");
    await cateProfile.destroy({});
    return res.status(200).send(cateProfile);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

const getDetailCateService = async (req, res) => {
  try {
    const cateProdile = await db.cate_profile.findByPk(req.params.id);
    if (!cateProdile) return res.status(404).send("CATE PROFILE NOT FOUND");
    return res.status(200).send(cateProdile);
  } catch (e) {
    return res.status(500).send(e);
  }
};
const updateCateProfileService = async (req, res) => {
  try {
    const Cate = await db.cate_profile.findByPk(req.params.id);
    if (Cate) {
      Cate.name = req.body.name;
      await Cate.save();
      return res.status(200).send("Update Cate successfully");
    } else {
      return res.status(400, "Cate not found");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
};
module.exports = {
  addCateProfileService,
  getCateProfileService,
  deleteCateService,
  getDetailCateService,
  updateCateProfileService,
  getAllService,
};
