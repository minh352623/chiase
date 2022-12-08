const db = require("../models");
const { Op } = require("sequelize");
let per_page = 4;
let ListGroup = async (req, res) => {
  try {
    let offset = (req.query.page - 1) * per_page;
    let keyword = req.query.keyword || "";
    let Groups = await db.Group_User.findAndCountAll({
      limit: per_page,
      offset: offset,
      order: [["id", "DESC"]],
      where: {
        name: {
          [Op.substring]: keyword,
        },
      },
    });
    Groups.per_page = per_page;
    return res.status(200).json(Groups);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: e,
    });
  }
};

let CreateNewGroup = async (req, res) => {
  let Group = await db.Group_User.create(req.body);
  return res.status(200).send("Add group successfully");
};
let getDetailGroupService = async (req, res) => {
  try {
    const id = req.params.id;
    const group = await db.Group_User.findByPk(id);
    return res.status(200).send(group);
  } catch (e) {
    console.log(e);
  }
};
let UpdateGroupService = async (req, res) => {
  try {
    const id = req.params.id;
    const group = await db.Group_User.findByPk(id);
    if (group) {
      group.name = req.body.name;
      await group.save();
      return res.status(200).send("Update group successfully");
    } else {
      return res.status(400, "group not found");
    }
  } catch (e) {
    console.log(e);
  }
};
let DeleteGroupService = async (req, res) => {
  try {
    const id = req.params.id;
    const group = await db.Group_User.findByPk(id);
    if (group) {
      let users = await db.User.findAll({
        where: {
          group_id: id,
        },
      });
      if (!users || users.length <= 0) {
        await group.destroy({
          force: true,
        });
        return res.status(200).send("Delete group successfully");
      } else {
        return res
          .status(400)
          .send("Delete group error, because still " + users.length + " user");
      }
    } else {
      return res.status(500, "group not found");
    }
  } catch (e) {
    console.log(e);
  }
};

let getAllService = async (req, res) => {
  try {
    let Groups = await db.Group_User.findAll();
    return res.status(200).json(Groups);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: e,
    });
  }
};
module.exports = {
  CreateNewGroup: CreateNewGroup,
  ListGroup: ListGroup,
  getDetailGroupService: getDetailGroupService,
  UpdateGroupService: UpdateGroupService,
  DeleteGroupService: DeleteGroupService,
  getAllService: getAllService,
};
