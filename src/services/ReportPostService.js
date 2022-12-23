const { Op } = require("sequelize");
const db = require("../models");

const createReportPostService = async (req, res) => {
  try {
    const reportPost = await db.Report.create({
      post_id: req.body.post_id,
      user_id_report: req.body.user_id_report,
      option_id_report: req.body.option_id_report,
      status: 0,
    });

    return res.status(200).send(reportPost);
  } catch (e) {
    return res.status(500).send(e);
  }
};
let per_page = 10;

const getReportAdminService = async (req, res) => {
  try {
    let keyword = req.query?.keyword || "";

    const reports = await db.Post.findAll({
      where: {
        "$report_post_data.post_id$": { [Op.ne]: "" },
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

        "$report_post_data.status$": req.query.status,
      },
      include: [
        {
          model: db.Report,
          as: "report_post_data",
          include: [
            {
              model: db.User,
              as: "user_data",
              attributes: ["firstName", "lastName", "id", "avatar"],
            },
            {
              model: db.Option_Report,
              as: "option_data",
            },
          ],
        },
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
      ],
    });

    return res.status(200).send(reports);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

const getNotiReportService = async (req, res) => {
  try {
    const numberNoti = await db.Report.count({
      where: {
        status: 0,
      },
    });
    console.log(numberNoti);
    return res.status(200).send({
      numberNoti: numberNoti,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
const browserUpdateReportService = async (req, res) => {
  try {
    const udpated = await db.Report.update(
      { status: 1 },
      { where: { post_id: req.body.post_id } }
    );
    if (req.body.statusDelete == 1) {
      const post = await db.Post.findByPk(req.body.post_id);
      if (!post) return res.status(404).send("POST NOT FOUND");
      if (post.share_post_id) {
        const parentPost = await db.Post.findByPk(post.share_post_id);
        if (!parentPost) return res.status(404).send("PARENT POST NOT FOUND");
        parentPost.share_count = +parentPost.share_count - 1;
        await parentPost.save();
        const statusDelete = await db.Share_Post.destroy({
          where: {
            post_id: post?.share_post_id,
          },
        });
      }
      await post.destroy({
        force: true,
      });
      const statusDeleteComment = await db.Comment.destroy({
        where: {
          post_id: req.body.post_id,
        },
      });
      const statusDeleteLike = await db.likes.destroy({
        where: {
          post_id: req.body.post_id,
        },
      });
      const notifycationNew = await db.Notifycation.create({
        user_id: req.body.user_id,
        text: "Admin: " + req.body.text,
        post_id: req.body.post_id,
        avatar: req.body.avatar,
        key: "admin",
      });
    }
    return res.status(200).send("Duyệt báo cáo thành công!");
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
module.exports = {
  createReportPostService,
  getReportAdminService,
  getNotiReportService,
  browserUpdateReportService,
};
