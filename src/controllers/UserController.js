const {
  createUserService,
  getPaginateUser,
  getUserService,
  updateUserService,
  deleteUserService,
  getUserHomeService,
  getUserTrashService,
  restoreUserService,
  DeleteUserForceService,
  exportExcelService,
  importExcelService,
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
const DeleteUserForce = (req, res) => {
  try {
    return DeleteUserForceService(req, res);
  } catch (e) {
    return res.status(500).send(e);
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
const jwt = require("jsonwebtoken");
const db = require("../models");
const { Op } = require("sequelize");
const getTokenVideo = async (req, res) => {
  // console.log("token video ");

  // return res.status(200).send("token video call");
  const apiKeySid = "SK.0.cCnyxivuoD4CTlhRmgfQqm2Tr9mWKNCh";
  const apiKeySecret = "OVZhdTNPR3RQVFg4bWxJY1JGd3pFand1MkNVTmJveQ==";
  var now = Math.floor(Date.now() / 1000);
  var exp = now + 3600 * 30;

  var header = { cty: "stringee-api;v=1" };
  var payload = {
    jti: apiKeySid + "-" + now,
    iss: apiKeySid,
    exp: exp,
    userId: req.params.id,
  };

  var token = jwt.sign(payload, apiKeySecret, {
    algorithm: "HS256",
    header: header,
  });
  console.log(token);
  const tokenOld = await db.Token_Video.findOne({
    where: {
      user_id: req.params.id,
    },
  });
  if (tokenOld) {
    await tokenOld.destroy({
      force: true,
    });
  }
  const tokenVideo = await db.Token_Video.create({
    user_id: req.params.id,
    token: token,
  });
  return res.status(200).send({ tokenVideo: token });
};

const getUserTrash = (req, res) => {
  try {
    return getUserTrashService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const restoreUser = (req, res) => {
  try {
    return restoreUserService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const exportExcel = (req, res) => {
  try {
    return exportExcelService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};
const importExcel = (req, res) => {
  try {
    const file = req.files?.uploaded_file || "";
    return importExcelService(req, res, file);
  } catch (e) {
    console.log(e);
  }
};
module.exports = {
  getListUser: getListUser,
  createUser: createUser,
  getUser: getUser,
  UpdateUser: UpdateUser,
  DeleteUser: DeleteUser,
  getUserHome,
  getTokenVideo,
  getUserTrash,
  restoreUser,
  DeleteUserForce,
  exportExcel,
  importExcel,
};
