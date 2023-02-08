const express = require("express");
const {
  login,
  register,
  createTokenFacebook,
  createTokenGithub,
  loginWithFaceID,
} = require("../controllers/AuthController");
let router = express.Router();
const passport = require("passport");
const { createTokenGoogle, logout } = require("../controllers/userController");
const {
  isAuthentication,
  online_user_id,
  online_user_email,
} = require("../Middeware/AuthMiddleware");
const CLIENT_URL = "http://localhost:5173";
// router.get("/logout", [isAuthentication], logout);

router.get("/login-google-success/:id", [online_user_id], createTokenGoogle);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);
router.get(
  "/google/callback",
  (req, res, next) => {
    passport.authenticate("google", (error, profile) => {
      console.log("profile", profile);
      console.log("error", error);

      req.user = profile;
      next();
    })(req, res, next);
  },
  (req, res) => {
    res.redirect(CLIENT_URL + "/login-google-success/" + req.user.id);
  }
);

router.get(
  "/login-facebook-success/:id",
  [online_user_id],
  createTokenFacebook
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
    session: false,
  })
);
router.get(
  "/facebook/callback",
  (req, res, next) => {
    passport.authenticate("facebook", (error, profile) => {
      console.log("error", error);

      req.user = profile;
      next();
    })(req, res, next);
  },
  (req, res) => {
    res.redirect(CLIENT_URL + "/login-facebook-success/" + req.user.id);
  }
);
router.get("/login-github-success/:id", [online_user_id], createTokenGithub);

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);
router.get(
  "/github/callback",
  (req, res, next) => {
    passport.authenticate("github", (error, profile) => {
      req.user = profile;
      next();
    })(req, res, next);
  },
  (req, res) => {
    res.redirect(CLIENT_URL + "/login-github-success/" + req.user.id);
  }
);

router.post("/faceIDLogin", loginWithFaceID);
router.post("/login", [online_user_email], login);

router.post("/register", register);
module.exports = router;
