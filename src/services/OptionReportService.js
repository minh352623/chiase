const cloudinary = require("cloudinary");
const { Op } = require("sequelize");
const db = require("../models");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
let per_page = 5;

const getOptionAdminService = async (req, res) => {
  try {
    let offset = (req.query.page - 1) * per_page;
    let keyword = req.query.keyword || "";

    let options = await db.Option_Report.findAndCountAll({
      limit: per_page,
      offset: offset,
      order: [["id", "DESC"]],
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              {
                text: {
                  [Op.substring]: keyword,
                },
              },
            ],
          },
        ],
      },
    });
    options.per_page = per_page;
    return res.status(200).json(options);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
const createOptionService = async (req, res, img) => {
  try {
    let link = "";
    if (img.tempFilePath) {
      const info = await cloudinary.v2.uploader.upload(img.tempFilePath, {
        folder: "home",
      });
      link = info.url;
    }
    console.log("ava " + link);
    const option = await db.Option_Report.create({
      img: link,
      text: req.body.text,
    });

    return res.status(200).send(option);
  } catch (e) {
    return res.status(500).send(e);
  }
};
const deleteOptionService = async (req, res) => {
  try {
    const option = await db.Option_Report.findByPk(req.params.id);
    if (option) {
      await option.destroy({
        force: true,
      });
      return res.status(200).json("Delete option successful");
    } else {
      return res.status(404).send("Option not found");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
};

const getAllOptionService = async (req, res) => {
  try {
    const options = await db.Option_Report.findAll();
    return res.status(200).send(options);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

const getDetailService = async (req, res) => {
  try {
    const option = await db.Option_Report.findByPk(req.params.id);
    if (!option) {
      return res.status(404).send("Option not found");
    }
    return res.status(200).send(option);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const UpdateOptionService = async (req, res, img) => {
  try {
    let link = "";
    if (img.tempFilePath) {
      const info = await cloudinary.v2.uploader.upload(img.tempFilePath, {
        folder: "home",
      });
      link = info.url;
    }
    console.log("ava " + link);
    const option = await db.Option_Report.findByPk(req.params.id);
    if (!option) return res.status(404).send("option not found");

    if (link) {
      option.img = link;
    }

    if (req.body.text) {
      option.text = req.body.text;
    }

    await option.save();

    return res.status(200).send(option);
  } catch (e) {
    return res.status(500).send(e);
  }
};
module.exports = {
  createOptionService,
  getOptionAdminService,
  deleteOptionService,
  getAllOptionService,
  getDetailService,
  UpdateOptionService,
};
