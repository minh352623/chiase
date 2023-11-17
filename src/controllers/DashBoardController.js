const {
  flexHeaderService,
  manager_online_user_service,
  exportExcelInfoOnline_service,
  addInfoDeviceUser,
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
const addInfoDeviceUserController = (req, res) => {
  try{
    return addInfoDeviceUser(req,res);
  }catch (e) {
    console.log("🚀 ~ file: DashBoardController.js:33 ~ addInfoDeviceUser ~ e:", e)
    
  }
}
module.exports = {
  flexHeader,
  manager_online_user,
  exportExcelInfoOnline,
  addInfoDeviceUserController
};
