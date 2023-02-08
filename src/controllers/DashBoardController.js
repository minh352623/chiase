const {
  flexHeaderService,
  manager_online_user_service,
  exportExcelInfoOnline_service,
} = require("../services/DashboardService");

const flexHeader = (req, res) => {
  try {
    return flexHeaderService(req, res);
  } catch (e) {
    return res.status(500).json(e);
  }
};
const manager_online_user = (req, res) => {
  try {
    return manager_online_user_service(req, res);
  } catch (e) {
    return res.status(500).json(e);
  }
};

const exportExcelInfoOnline = (req, res) => {
  try {
    return exportExcelInfoOnline_service(req, res);
  } catch (e) {
    return res.status(500).json(e);
  }
};
module.exports = {
  flexHeader,
  manager_online_user,
  exportExcelInfoOnline,
};
