const db = require("../models/index");
const {
  CreateNewGroup,
  ListGroup,
  getDetailGroupService,
  UpdateGroupService,
  DeleteGroupService,
  getAllService,
} = require("../services/GroupServices");
const getListGroup = async (req, res) => {
  try {
    return ListGroup(req, res);
  } catch (e) {
    //gui ma loi ve client de refresh token
    //logs err
    console.log(e);
  }
};
const CreateGroup = async (req, res) => {
  try {
    return CreateNewGroup(req, res);
  } catch (e) {
    //gui ma loi ve client de refresh token
    //logs err
    console.log(e);
  }
};

const getDetailGroup = async (req, res) => {
  try {
    return getDetailGroupService(req, res);
  } catch (e) {
    console.log(e);
  }
};

const UpdateGroup = (req, res) => {
  try {
    return UpdateGroupService(req, res);
  } catch (e) {}
};

const DeleteGroup = (req, res) => {
  try {
    return DeleteGroupService(req, res);
  } catch (e) {
    console.log(e);
  }
};

const getAll = (req, res) => {
  try {
    return getAllService(req, res);
  } catch (e) {
    console.log(e);
  }
};
module.exports = {
  getListGroup: getListGroup,
  CreateGroup: CreateGroup,
  getDetailGroup: getDetailGroup,
  UpdateGroup: UpdateGroup,
  DeleteGroup: DeleteGroup,
  getAll: getAll,
};
