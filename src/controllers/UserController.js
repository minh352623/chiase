const db = require("../models/index");
const {
  createUserService,
  getPaginateUser,
  getUserService,
  updateUserService,
  deleteUserService,
  getUserHomeService,
} = require("../services/UserServices");
const getListUser = async (req, res) => {
  try {
    return getPaginateUser(req, res);
  } catch (e) {
    //gui ma loi ve client de refresh token
    //logs err
    console.log(e);
  }
};

const createUser = (req, res) => {
  try {
    const file = req?.files?.avatar || "";
    return createUserService(req, res, file);
  } catch (e) {
    console.log(e);
  }
};

const getUser = (req, res) => {
  try {
    return getUserService(req, res);
  } catch (e) {
    console.log(e);
  }
};

const UpdateUser = (req, res) => {
  try {
    const file = req?.files?.avatar || "";
    return updateUserService(req, res, file);
  } catch (e) {
    console.log(e);
  }
};

const DeleteUser = (req, res) => {
  try {
    return deleteUserService(req, res);
  } catch (e) {
    console.log(e);
  }
};

const getUserHome = (req, res) => {
  try {
    return getUserHomeService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};
module.exports = {
  getListUser: getListUser,
  createUser: createUser,
  getUser: getUser,
  UpdateUser: UpdateUser,
  DeleteUser: DeleteUser,
  getUserHome,
};
