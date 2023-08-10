const db = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const { response } = require("express");
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
let per_page = 10;
let createPostService = async (req, res) => {
  try {
    // return res.status(200).send(req.body);
    if (req.body.share_post_id) {
      const oldPost = await db.post.findByPk(req.body?.share_post_id);
      if (!oldPost) return res.status(404).send("POST NOT FOUND");
      oldPost.share_count = +oldPost.share_count + 1;
      await oldPost.save();
      const share_post = await db.share_post.create({
        user_id: req.body.user_id,
        post_id: req.body.share_post_id,
      });
    }
    let post = await db.post.create({
      user_id: req.body.user_id,
      content: req.body.content,
      share_post_id: req.body?.share_post_id || null,
    });
    let file_upload = req.body?.urls || "";
    if (file_upload) {
      if (Array.isArray(file_upload) && file_upload.length > 0) {
        file_upload.forEach(async (item, index) => {
          let video_image = await db.video_image.create({
            post_id: post.id,
            link: item,
            subvalue: req.body.sub_file ? req.body.sub_file[index] : "",
          });
        });
      } else {
        let video_image = await db.video_image.create({
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
    let Posts;
    const keyword = req.query.q || "";
    if (req.query?.id_user) {
      Posts = await db.post.findAll({
        where: {
          user_id: req.query.id_user,
        },
        limit: 15,
        order: [["createdAt", "DESC"]],

        include: [
          {
            model: db.user,
            as: "user_data",
            attributes: ["firstName", "lastName", "id", "avatar"],
          },

          {
            model: db.post,
            as: "post_data_two",
            include: [
              {
                model: db.video_image,
                as: "file_data",
              },
              {
                model: db.user,
                as: "user_data",
                attributes: ["firstName", "lastName", "id", "avatar"],
              },
            ],
          },
          {
            model: db.video_image,
            as: "file_data",
          },
          {
            model: db.likes,
            as: "like_data",
            attributes: ["user_id"],
            include: [
              {
                model: db.user,
                as: "user_data",
                attributes: ["firstName", "lastName", "id"],
              },
            ],
          },
          {
            model: db.share_post,
            as: "user_share",
            attributes: ["user_id"],
            include: [
              {
                model: db.user,
                as: "user_data",
                attributes: ["firstName", "lastName", "id"],
              },
            ],
          },
          {
            model: db.comment,
            as: "comment_data",
            include: [
              {
                model: db.user,
                as: "user_data",
                attributes: ["firstName", "lastName", "avatar"],
              },
              {
                model: db.like_comment,
                as: "like_comment_data",
              },
            ],
          },
        ],
      });
    } else {
      Posts = await db.post.findAll({
        limit: 15,
        order: [["createdAt", "DESC"]],
        where: {
          [Op.or]: [
            {
              content: {
                [Op.substring]: keyword,
              },
            },
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
        include: [
          {
            model: db.user,
            as: "user_data",
            attributes: ["firstName", "lastName", "id", "avatar"],
            required: true,
          },

          {
            model: db.post,
            as: "post_data_two",
            include: [
              {
                model: db.video_image,
                as: "file_data",
              },
              {
                model: db.user,
                as: "user_data",
                attributes: ["firstName", "lastName", "id", "avatar"],
              },
            ],
          },
          {
            model: db.video_image,
            as: "file_data",
          },
          {
            model: db.likes,
            as: "like_data",
            attributes: ["user_id"],
            include: [
              {
                model: db.user,
                as: "user_data",
                attributes: ["firstName", "lastName", "id"],
              },
            ],
          },
          {
            model: db.share_post,
            as: "user_share",
            attributes: ["user_id"],
            include: [
              {
                model: db.user,
                as: "user_data",
                attributes: ["firstName", "lastName", "id"],
              },
            ],
          },
          {
            model: db.comment,
            as: "comment_data",
            include: [
              {
                model: db.user,
                as: "user_data",
                attributes: ["firstName", "lastName", "avatar"],
              },
              {
                model: db.like_comment,
                as: "like_comment_data",
              },
            ],
          },
        ],
      });
    }
    return res.status(200).send(Posts);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

let getPostAdminService = async (req, res) => {
  try {
    console.log("page", req.query.page);
    let offset = (req.query.page - 1) * per_page;
    let keyword = req.query.keyword || "";
    let count = 0;
    count = await db.post.count();
    let posts = await db.post.findAll({
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
        { model: db.video_image, as: "file_data" },
        {
          model: db.user,
          as: "user_data",
          required: true,
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
    posts.count = count;
    let data = {
      data: posts,
      per_page: per_page,
      count: count,
    };
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

const getDetailPostService = async (req, res) => {
  try {
    const postOld = await db.post.findByPk(req.params.id);
    if (!postOld) return res.status(404).send("POST NOT FOUND");

    const post = await db.post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.user,
          as: "user_data",
          attributes: ["firstName", "lastName", "id", "avatar"],
        },
        {
          model: db.video_image,
          as: "file_data",
        },
        {
          model: db.post,
          as: "post_data_two",
          include: [
            {
              model: db.video_image,
              as: "file_data",
            },
            {
              model: db.user,
              as: "user_data",
              attributes: ["firstName", "lastName", "id", "avatar"],
            },
          ],
        },
      ],
    });
    return res.status(200).send(post);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
const deletePostService = async (req, res, next) => {
  try {
    const post = await db.post.findByPk(req.params.id);
    if (post.share_post_id) {
      const parentPost = await db.post.findByPk(post.share_post_id);
      if (!parentPost) return res.status(404).send("PARENT POST NOT FOUND");
      parentPost.share_count = +parentPost.share_count - 1;
      await parentPost.save();
      const statusDelete = await db.share_post.destroy({
        where: {
          post_id: post?.share_post_id,
        },
      });
    }
    const statusDelete = await db.post.destroy({
      where: {
        id: req.params.id,
      },
    });
    const statusDeleteComment = await db.comment.destroy({
      where: {
        post_id: req.params.id,
      },
    });
    const statusDeleteLike = await db.likes.destroy({
      where: {
        post_id: req.params.id,
      },
    });
    return res.status(200).send("delete success");
  } catch (e) {
    return res.status(500).send(e);
  }
};

const updatePostService = async (req, res) => {
  try {
    const post = await db.post.findByPk(req.params.id);
    if (post) {
      post.content = req.body.content;
      await post.save();
      return res.status(200).send("Update post successfully");
    } else {
      return res.status(404).send("Post not found");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
};

const getNineImageService = async (req, res) => {
  try {
    const images = await db.post.findAll({
      where: {
        user_id: req.query.user_id,
        "$file_data.link$": {
          [Op.ne]: "",
          // [Op.notLike]: `%mp4`,
        },
      },
      include: [
        {
          model: db.video_image,
          as: "file_data",
          attributes: ["link"],
          required: true,
        },
      ],
    });
    let convertData = [];

    images.forEach((image) => {
      convertData = [...convertData, ...image.file_data];
    });
    return res.status(200).send({
      convertData,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

// const searchGlobalService = async (req, res) => {
//   try {
//     const keyword = req.query.q || "";
//     Posts = await db.post.findAll({
//       order: [["createdAt", "DESC"]],
//       where: {
//         [Op.or]: [
//           {
//             content: {
//               [Op.substring]: keyword,
//             },
//           },
//           {
//             "$user_data.firstName$": {
//               [Op.substring]: keyword,
//             },
//           },
//           {
//             "$user_data.lastName$": {
//               [Op.substring]: keyword,
//             },
//           },
//           {
//             "$user_data.email$": {
//               [Op.substring]: keyword,
//             },
//           },
//           {
//             "$user_data.address$": {
//               [Op.substring]: keyword,
//             },
//           },
//           {
//             "$user_data.phone$": {
//               [Op.substring]: keyword,
//             },
//           },
//         ],
//       },
//       include: [
//         {
//           model: db.user,
//           as: "user_data",
//         },

//         {
//           model: db.post,
//           as: "post_data_two",
//           include: [
//             {
//               model: db.video_image,
//               as: "file_data",
//             },
//             {
//               model: db.user,
//               as: "user_data",
//               attributes: ["firstName", "lastName", "id", "avatar"],
//             },
//           ],
//         },
//         {
//           model: db.video_image,
//           as: "file_data",
//         },
//         {
//           model: db.likes,
//           as: "like_data",
//           attributes: ["user_id"],
//           include: [
//             {
//               model: db.user,
//               as: "user_data",
//               attributes: ["firstName", "lastName", "id"],
//             },
//           ],
//         },
//         {
//           model: db.share_post,
//           as: "user_share",
//           attributes: ["user_id"],
//           include: [
//             {
//               model: db.user,
//               as: "user_data",
//               attributes: ["firstName", "lastName", "id"],
//             },
//           ],
//         },
//         {
//           model: db.comment,
//           as: "comment_data",
//           include: [
//             {
//               model: db.user,
//               as: "user_data",
//               attributes: ["firstName", "lastName", "avatar"],
//             },
//             {
//               model: db.like_comment,
//               as: "like_comment_data",
//             },
//           ],
//         },
//       ],
//     });
//     return res.status(200).json(Posts);
//   } catch (e) {
//     return res.status(500).send(e);
//   }
// };

module.exports = {
  createPostService,
  getPostHomeService,
  getPostAdminService,
  getDetailPostService,
  deletePostService,
  updatePostService,
  getNineImageService,
  // searchGlobalService,
};
