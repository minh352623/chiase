const {
  addCateProfileService,
  getCateProfileService,
  deleteCateService,
  getDetailCateService,
  updateCateProfileService,
  getAllService,
} = require("../services/CateProfileService");

const addCateProfile = (req, res) => {
  try {
    return addCateProfileService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};
const getAll = (req, res) => {
  try {
    return getAllService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};
const getCateProfile = (req, res) => {
  try {
    return getCateProfileService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const deleteCate = (req, res) => {
  try {
    return deleteCateService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};
const getDetailCate = (req, res) => {
  try {
    return getDetailCateService(req, res);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

const UpdateCate = (req, res) => {
  try {
    return updateCateProfileService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};
module.exports = {
  addCateProfile,
  getCateProfile,
  deleteCate,
  getDetailCate,
  UpdateCate,
  getAll,
};
