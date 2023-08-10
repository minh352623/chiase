const db = require("../models");

const getNotifycationUserService = async (req, res) => {
  try {
    const notys = await db.Notifycation.findAll({
      where: {
        user_id: req.params.id,
      },
      order: [["createdAt", "DESC"]],

      include: [{ model: db.user, as: "user_data", attributes: ["avatar"] }],
    });
    let count = 0;
    if (notys.length > 0) {
      notys.forEach((item) => {
        if (item.read == 0) {
          count++;
        }
      });
    }

    return res.status(200).send({ notys: notys, noty_count: count });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
const readNotisService = async (req, res) => {
  try {
    const readNotis = await db.Notifycation.update(
      { read: 1 },
      { where: { user_id: req.params.id } }
    );

    return res.status(200).send("Read notifications successfully");
  } catch (e) {
    return res.status(500).send(e);
  }
};
module.exports = {
  getNotifycationUserService,
  readNotisService,
};
