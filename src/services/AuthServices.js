const db = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let loginAuthService = async (req, res) => {
  try {
    //get info client
    const user = await db.user.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(404).send("Invalid Email");
    }
    const id_user = user.id;
    //check password for password
    const isPassvalid = bcrypt.compareSync(req.body.password, user.password);

    if (!isPassvalid) {
      return res.status(400).send("Invalid Password");
    }

    const jwtToken = jwt.sign({ ...user }, process.env.SECRET_JWT, {
      expiresIn: 3600 * 24,
    });

    return res.status(200).send({
      accessToken: jwtToken,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.message);
  }
};
let registerService = async (req, res) => {
  try {
    //get info client
    const { firstName, lastName, email, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await db.user.create({
      firstName,
      lastName,
      email,
      password: hash,
    });

    res.status(200).send(newUser);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const createTokenFacebookService = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.params.id);
    if (!user) return res.status(404).send("USER NOT FOUND");
    const jwtToken = jwt.sign({ ...user }, process.env.SECRET_JWT, {
      expiresIn: 3600 * 24,
    });
    return res.status(200).send({
      accessToken: jwtToken,
    });
  } catch (e) {
    return res.status(500).send;
  }
};
const createTokenGithubService = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.params.id);
    if (!user) return res.status(404).send("USER NOT FOUND");
    const jwtToken = jwt.sign({ ...user }, process.env.SECRET_JWT, {
      expiresIn: 3600 * 24,
    });
    return res.status(200).send({
      accessToken: jwtToken,
    });
  } catch (e) {
    return res.status(500).send;
  }
};

const loginWithFaceIDService = async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: { email: req.body.email },
    });
    if (!user) return res.status(404).send("USER NOT FOUND");
    const jwtToken = jwt.sign({ ...user }, process.env.SECRET_JWT, {
      expiresIn: 3600 * 24,
    });
    return res.status(200).send({
      accessToken: jwtToken,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
module.exports = {
  loginAuthService,
  registerService,
  createTokenFacebookService,
  createTokenGithubService,
  loginWithFaceIDService,
};
