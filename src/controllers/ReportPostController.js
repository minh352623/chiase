const {
  createReportPostService,
  getReportAdminService,
  getNotiReportService,
  browserUpdateReportService,
} = require("../services/ReportPostService");

const createReportPost = (req, res) => {
  try {
    return createReportPostService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};
const getReportAdmin = (req, res) => {
  try {
    return getReportAdminService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const getNotiReport = (req, res) => {
  try {
    return getNotiReportService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const browserUpdateReport = (req, res) => {
  try {
    return browserUpdateReportService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};
module.exports = {
  createReportPost,
  getReportAdmin,
  getNotiReport,
  browserUpdateReport,
};
