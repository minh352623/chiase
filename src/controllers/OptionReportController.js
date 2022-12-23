const {
  createOptionService,
  getOptionAdminService,
  deleteOptionService,
  getAllOptionService,
  getDetailService,
  UpdateOptionService,
} = require("../services/OptionReportService");

const createOption = (req, res) => {
  try {
    const file = req?.files?.img || "";

    return createOptionService(req, res, file);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const getOptionAdmin = (req, res) => {
  try {
    return getOptionAdminService(req, res);
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

const getAllOption = (req, res) => {
  try {
    return getAllOptionService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const getDetail = (req, res) => {
  try {
    return getDetailService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};
const UpdateOption = (req, res) => {
  try {
    const file = req?.files?.img || "";

    return UpdateOptionService(req, res, file);
  } catch (e) {
    return res.status(500).send(e);
  }
};
module.exports = {
  createOption,
  getOptionAdmin,
  deleteOption,
  getAllOption,
  getDetail,
  UpdateOption,
};
