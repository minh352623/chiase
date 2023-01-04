const {
  createPofileUserService,
  fetchAllProfileService,
  updateProfileService,
  deleteOptionService,
} = require("../services/ProfileUserService");

const createPofileUser = (req, res) => {
  try {
    return createPofileUserService(req, res);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const fetchAllProfile = (req, res) => {
  try {
    return fetchAllProfileService(req, res);
  } catch (e) {
    return res.status(500).json(e);
  }
};

const updateProfile = (req, res) => {
  try {
    return updateProfileService(req, res);
  } catch (e) {
    return res.status(500).json(e);
  }
};

const deleteOption = (req, res) => {
  try {
    return deleteOptionService(req, res);
  } catch (e) {
    return res.status(500).json(e);
  }
};

module.exports = {
  createPofileUser,
  fetchAllProfile,
  updateProfile,
  deleteOption,
};
