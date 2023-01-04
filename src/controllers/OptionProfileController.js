const {
  getOptionProfileService,
  addOptionProfileService,
  deleteOptionService,
  getDetailOptionService,
  UpdateOptionService,
  getOptionProfileCateService,
} = require("../services/OptionProfileService");

const getOptionProfile = (req, res) => {
  try {
    return getOptionProfileService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};
const addOptionProfile = (req, res) => {
  try {
    return addOptionProfileService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};
const deleteOption = (req, res) => {
  try {
    return deleteOptionService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};
const getDetailOption = (req, res) => {
  try {
    return getDetailOptionService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const UpdateOption = (req, res) => {
  try {
    return UpdateOptionService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};
const getOptionProfileCate = (req, res) => {
  try {
    return getOptionProfileCateService(req, res);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
module.exports = {
  getOptionProfile,
  addOptionProfile,
  deleteOption,
  getDetailOption,
  UpdateOption,
  getOptionProfileCate,
};
