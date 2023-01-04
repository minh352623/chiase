const db = require("../models");

const createPofileUserService = async (req, res) => {
  try {
    const profile = await db.Profile_User.create({
      user_id: req.body.user_id,
      option_profile_id: req.body.option_profile_id,
      value: req.body.value,
      status: req.body.status,
    });
    return res.status(201).json({
      success: true,
      message: "Successfully created user",
      data: profile,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

const fetchAllProfileService = async (req, res) => {
  try {
    const profile = await db.Profile_User.findAll({
      where: {
        user_id: req.query.user_id,
      },
      include: [{ model: db.Option_Profile, as: "option_data" }],
    });
    return res.status(200).json({
      success: true,
      message: "Successfully fetched all profile",
      data: profile,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

const updateProfileService = async (req, res) => {
  try {
    const option = await db.Profile_User.findByPk(req.params.id);
    if (!option) return res.status(404).send("OPTION NOT FOUND");
    if (req.body.value) {
      option.value = req.body.value;
    }

    await option.save();
    return res.status(200).json({
      success: true,
      message: "Successfully updated profile",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
const deleteOptionService = async (req, res) => {
  try {
    const option = await db.Profile_User.findByPk(req.params.id);
    if (!option) return res.status(404).send("OPTION NOT FOUND");
    await option.destroy();
    return res.status(200).json({
      success: true,
      message: "Successfully deleted option",
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};
module.exports = {
  createPofileUserService,
  fetchAllProfileService,
  updateProfileService,
  deleteOptionService,
};
