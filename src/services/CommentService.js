const db = require("../models");
const cloudinary = require("cloudinary");
require("dotenv").config();
const { Op } = require("sequelize");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const createCommentService = async (req, res, file) => {
  try {
    let fileNew = "";
    if (file.tempFilePath) {
      const info = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: "home",
      });
      fileNew = info.url;
    }
    if (file || req.body.content) {
      const comment = await db.Comment.create({
        post_id: req.body.post_id,
        user_id: req.body.user_id,
        text: req.body.content,
        file: fileNew,
      });
      const updatePost = await db.Post.findByPk(req.body.post_id);
      if (!updatePost) return res.status(404).send("POST NOT FOUND");
      updatePost.comment_count = updatePost.comment_count + 1;
      let update = await updatePost.save();

      if (req.body.ownPost != req.body.user_id) {
        // const notifycation = await db.Notifycation.findOne({
        //   where: {
        //     [Op.and]: [
        //       {
        //         user_id: req.body.ownPost,
        //       },
        //       {
        //         key: "comment",
        //       },
        //       {
        //         post_id: req.body.post_id,
        //       },
        //     ],
        //   },
        // });
        // if (!notifycation) {
        const notifycationNew = await db.Notifycation.create({
          user_id: req.body.ownPost,
          text: req.body.text,
          post_id: req.body.post_id,
          key: "comment",
          avatar: req.body?.avatar_comment || "",
        });
        // }
      }

      return res.status(200).send(comment);
    }
    return res.status(500).send("data not empty");
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

const createLikeCommentService = async (req, res) => {
  try {
    if (req.body.user_id && req.body.comment_id) {
      const like_comment_own = await db.Like_comment.findOne({
        where: {
          [Op.and]: [
            {
              user_id: req.body.user_id,
            },
            {
              comment_id: req.body.comment_id,
            },
          ],
        },
      });
      const comment = await db.Comment.findByPk(req.body.comment_id);
      if (!comment) return res.status(404).send("COMMENT NOT FOUND");

      if (like_comment_own) {
        await like_comment_own.destroy({
          force: true,
        });
        comment.like_count = +comment.like_count - 1;
        let commentUpdate = await comment.save();
        return res.status(200).send("delete like comment");
      } else {
        const like_comment = await db.Like_comment.create({
          user_id: req.body.user_id,
          comment_id: req.body.comment_id,
        });
        comment.like_count = +comment.like_count + 1;
        await comment.save();
        if (req.body.ownComment != req.body.user_id) {
          const notifycation = await db.Notifycation.findOne({
            where: {
              [Op.and]: [
                {
                  user_id: req.body.ownComment,
                },
                {
                  key: "like_comment",
                },
                {
                  comment_id: req.body.comment_id,
                },
              ],
            },
          });
          if (!notifycation) {
            const notifycationNew = await db.Notifycation.create({
              user_id: req.body.ownComment,
              text: req.body.text,
              comment_id: req.body.comment_id,
              key: "like_comment",
              avatar: req.body?.avatar_comment || "",
            });
          }
        }
      }
      return res.status(200).send("create like comment");
    } else {
      return res.status(400).send("Value required");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

module.exports = {
  createCommentService,
  createLikeCommentService,
};
