const db = require("../models");
const { Op } = require("sequelize");

const createLikeService = async (req, res) => {
  try {
    const like = await db.likes.findOne({
      where: {
        [Op.and]: [
          {
            user_id: req.body.user_id,
          },
          {
            post_id: req.body.post_id,
          },
        ],
      },
    });
    const post = await db.Post.findByPk(req.body.post_id);
    if (!post) return res.status(404).send("POST NOT FOUND");

    if (like) {
      await like.destroy({
        force: true,
      });
      post.like_count = +post.like_count - 1;
      let postUpdate = await post.save();

      return res.status(200).send(postUpdate);
    } else {
      const likeNew = await db.likes.create({
        user_id: req.body.user_id,
        post_id: req.body.post_id,
      });

      post.like_count = +post.like_count + 1;
      let postUpdate = await post.save();
      if (req.body.ownPost != req.body.user_id) {
        const notifycation = await db.Notifycation.findOne({
          where: {
            [Op.and]: [
              {
                user_id: req.body.ownPost,
              },
              {
                key: "like",
              },
              {
                post_id: req.body.post_id,
              },
            ],
          },
        });
        if (!notifycation) {
          const notifycationNew = await db.Notifycation.create({
            user_id: req.body.ownPost,
            text: req.body.text,
            post_id: req.body.post_id,
            avatar: req.body.avatar_like,
          });
        }
      }
      return res.status(200).send(postUpdate);
    }
  } catch (e) {
    return res.status(500).send(e);
  }
};
module.exports = {
  createLikeService,
};
