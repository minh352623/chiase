const db = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
require("dotenv").config();
// let file_upload = [];
// for (const property in fileUpload) {
//   console.log(`${property}: ${fileUpload[property].tempFilePath}`);
//   if (fileUpload[property].tempFilePath) {
//     const info = await cloudinary.v2.uploader.upload(
//       fileUpload[property].tempFilePath,
//       {
//         folder: "home",
//       }
//     );
//     file_upload.push(info.url);
//   }
// }
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
let per_page = 2;
let createPostService = async (req, res) => {
  try {
    // return res.status(200).send(req.body);

    let post = await db.Post.create({
      user_id: req.body.user_id,
      content: req.body.content,
      share_post_id: req.body.share_post_id,
    });
    let file_upload = req.body?.urls || "";
    if (file_upload) {
      if (Array.isArray(file_upload) && file_upload.length > 0) {
        file_upload.forEach(async (item, index) => {
          let video_image = await db.Video_Image.create({
            post_id: post.id,
            link: item,
            subvalue: req.body.sub_file ? req.body.sub_file[index] : "",
          });
        });
      } else {
        let video_image = await db.Video_Image.create({
          post_id: post.id,
          link: file_upload,
          subvalue: req.body.sub_file ? req.body.sub_file : "",
        });
      }
    }
    return res.status(200).send("create post successfully");
  } catch (e) {
    res.status(500).send(e);
  }
};

let getPostHomeService = async (req, res) => {
  try {
    let Posts = await db.Post.findAll({
      limit: 15,
      order: [["createdAt", "DESC"]],

      include: [
        {
          model: db.User,
          as: "user_data",
          attributes: ["firstName", "lastName", "id", "avatar"],
        },

        {
          model: db.Post,
          as: "post_data_two",
          include: [
            {
              model: db.Video_Image,
              as: "file_data",
            },
            {
              model: db.User,
              as: "user_data",
              attributes: ["firstName", "lastName", "id", "avatar"],
            },
          ],
        },
        {
          model: db.Video_Image,
          as: "file_data",
        },
        {
          model: db.likes,
          as: "like_data",
          attributes: ["user_id"],
        },
        {
          model: db.Comment,
          as: "comment_data",
          include: [
            {
              model: db.User,
              as: "user_data",
              attributes: ["firstName", "lastName", "avatar"],
            },
            {
              model: db.Like_comment,
              as: "like_comment_data",
            },
          ],
        },
      ],
    });
    return res.status(200).send(Posts);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

let getPostAdminService = async (req, res) => {
  try {
    let offset = (req.query.page - 1) * per_page;
    let keyword = req.query.keyword || "";

    let posts = await db.Post.findAndCountAll({
      limit: per_page,
      offset: offset,
      order: [["createdAt", "DESC"]],
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              {
                content: {
                  [Op.substring]: keyword,
                },
              },
            ],
          },
        ],
      },
      include: [
        { model: db.Video_Image, as: "file_data" },
        {
          model: db.User,
          as: "user_data",
          attributes: [
            "firstName",
            "email",
            "address",
            "lastName",
            "id",
            "avatar",
          ],
        },
      ],
    });
    posts.per_page = per_page;

    return res.status(200).json(posts);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

const getDetailPostService = async (req, res) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.User,
          as: "user_data",
          attributes: ["firstName", "lastName", "id", "avatar"],
        },
        {
          model: db.Video_Image,
          as: "file_data",
        },
      ],
    });
    return res.status(200).send(post);
  } catch (e) {
    return res.status(500).send(e);
  }
};

module.exports = {
  createPostService,
  getPostHomeService,
  getPostAdminService,
  getDetailPostService,
};
