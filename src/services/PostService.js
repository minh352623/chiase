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

function uploadImage(file) {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.v2.uploader.upload(file.tempFilePath);
    //   toStream(file.buffer).pipe(upload);
    if (!upload) reject("loi");
    resolve(upload);
  });
}

async function uploadOneImageService(req, res, file) {
  try {
    const image = file;
    const img_upload = await uploadImage(image);
    return res.status(200).json({
      img: img_upload.url,
    });
  } catch (e) {
    console.log("🚀 ~ file: PostService.js:44 ~ uploadOneImageService ~ e:", e);
  }
}
async function uploadImageBase64(base64Image) {
  try {
    // Upload the base64 image to Cloudinary
    const result = await cloudinary.uploader.upload(base64Image, {
      resource_type: "image",
    });

    // The result.url contains the public URL of the uploaded image
    return result.url;
  } catch (error) {
    throw new Error("Failed to upload image to Cloudinary");
  }
}

async function uploadMultiImage(req, res, files) {
  const images = files;
  console.log(
    "🚀 ~ file: PostService.js:39 ~ uploadMultiImage ~ images:",
    images
  );
  const arrImgs = await Promise.all(
    images.map((image) => {
      return uploadImage(image).then((res) => res.url);
    })
  );

  return res.status(200).json({ arrImgs });
}

function convertToHttps(url) {
  // Check if the URL starts with "http://"
  if (url.startsWith("http://")) {
    // Replace "http://" with "https://"
    var newUrl = url.replace("http://", "https://");
    return newUrl;
  }

  // If the URL doesn't start with "http://", return it as is
  return url;
}

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
    let file_upload = req.body?.urls ?? null;

    if (file_upload) {
      if (Array.isArray(file_upload) && file_upload.length > 0) {
        file_upload.forEach(async (item, index) => {
          let video_image = await db.video_image.create({
            post_id: post.id,
            link: convertToHttps(item),
            subvalue: req.body.sub_file ? req.body.sub_file[index] : "",
          });
        });
      } else {
        let video_image = await db.video_image.create({
          post_id: post.id,
          link: convertToHttps(file_upload),
          subvalue: req.body.sub_file ? req.body.sub_file : "",
        });
      }
    }
    return res.status(200).send("create post successfully");
  } catch (e) {
    console.log("🚀 ~ file: PostService.js:132 ~ createPostService ~ e:", e);
    res.status(500).send(e);
  }
};

let getPostHomeService = async (req, res) => {
  try {
    let Posts;
    let offset = (req.query.page - 1) * +req.query.limit;

    const keyword = req.query.q || "";
    let post_useful = [];
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
      if(req.query.page == 1){
        post_useful =  await db.post.findAll({
          limit: 5,
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
            useful: 1
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
      Posts = await db.post.findAll({
        limit: +req.query.limit,
        offset: offset,
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
          useful: {
            [Op.ne]: 1,
          }
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
    return res.status(200).send([...post_useful,...Posts]);
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

const requestUsefulService = async (req, res) => {
  try {
    const type = req.query.type;
    const browser = req.query.browser;
    const client_check = req.query.client_check == "true" ? true : false;
    const post = await db.post.findByPk(req.params.id);
    if (post) {
      if (type) {
        if (browser == "true") {
          post.useful = 1;
        } else {
          console.log(
            "🚀 ~ file: PostService.js:643 ~ requestUsefulService ~ browser:",
            browser
          );

          post.request_useful = null;
        }
      } else {
        let req_useful = post.request_useful
          ? JSON.parse(post.request_useful)
          : [];
        console.log(
          "🚀 ~ file: PostService.js:646 ~ requestUsefulService ~ req_useful:",
          typeof req_useful
        );
        if (client_check) {
          console.log(
            "🚀 ~ file: PostService.js:653 ~ requestUsefulService ~ client_check:",
            typeof client_check
          );
          if (req_useful.includes(req.userId))
            return res.status(404).send("You updated status");
          req_useful.push(req.userId);
        } else {
          req_useful = req_useful.filter((user) => user != req.userId);
          console.log(
            "🚀 ~ file: PostService.js:657 ~ requestUsefulService ~ req_useful:",
            req_useful
          );
        }
        post.request_useful =
          req_useful.length > 0 ? JSON.stringify(req_useful) : null;
      }
      await post.save();
      return res.status(200).send("Update post successfully");
    } else {
      return res.status(404).send("Post not found");
    }
  } catch (e) {
    console.log("🚀 ~ file: PostService.js:644 ~ requestUsefulService ~ e:", e);
  }
};

const getListPostUsefulService = async (req, res) => {
  try {
    const posts = await db.post.findAll({
      limit: +req.query.limit ?? 15,
      order: [["createdAt", "ASC"]],
      where: {
        [Op.and]: [
          {
            request_useful: {
              [Op.not]: null,
            },
          },
          {
            useful: {
              [Op.ne]: 1,
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
    return res.status(200).json(posts);
  } catch (e) {
    console.log(
      "🚀 ~ file: PostService.js:687 ~ getListPostUsefulService ~ e:",
      e
    );
  }
};
module.exports = {
  createPostService,
  getPostHomeService,
  getPostAdminService,
  getDetailPostService,
  deletePostService,
  updatePostService,
  getNineImageService,
  // searchGlobalService,
  uploadMultiImage,
  uploadOneImageService,
  uploadImageBase64,
  requestUsefulService,
  getListPostUsefulService,
};
