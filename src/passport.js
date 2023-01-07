const passport = require("passport");
const db = require("./models");
const bcrypt = require("bcrypt");
require("dotenv").config();

var GoogleStrategy = require("passport-google-oauth20").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var GitHubStrategy = require("passport-github2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile.emails[0].value);
      const user = await db.User.findOne({
        where: {
          email: profile.emails[0].value,
        },
      });
      if (user) {
        done(null, user);
      } else {
        const user = await db.User.create({
          email: profile.emails[0].value,
          firstName: profile.name.familyName,
          lastName: profile.name.givenName,
          avatar: profile.photos[0].value,
          group_id: 2,
          password: bcrypt.hashSync("123456789", bcrypt.genSaltSync(10)),
        });
        return done(null, user);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/api/auth/facebook/callback",
      profileFields: ["id", "displayName", "name", "email", "photos"],
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      console.log(accessToken);

      if (profile.emails[0].value) {
        const user = await db.User.findOne({
          where: {
            email: profile.emails[0].value,
          },
        });
        if (user) {
          done(null, user);
        } else {
          const user = await db.User.create({
            email: profile.emails[0].value,
            firstName: profile.name.familyName,
            id_facebook: profile.id,

            lastName: profile.name.givenName,
            avatar: profile.photos[0].value,
            group_id: 2,
            password: bcrypt.hashSync("123456789", bcrypt.genSaltSync(10)),
          });
          return done(null, user);
        }
      } else {
        const user = await db.User.findOne({
          where: {
            id_facebook: profile.id,
          },
        });
        if (user) {
          done(null, user);
        } else {
          const user = await db.User.create({
            email: profile.emails[0].value,
            id_facebook: profile.id,
            firstName: profile.name.familyName,
            lastName: profile.name.givenName,
            avatar: profile.photos[0].value,
            group_id: 2,
            password: bcrypt.hashSync("123456789", bcrypt.genSaltSync(10)),
          });
          return done(null, user);
        }
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      // console.log(profile);
      // return done(null, profile);
      if (profile._json.email) {
        const user = await db.User.findOne({
          where: {
            email: profile.emails[0].value,
          },
        });
        if (user) {
          done(null, user);
        } else {
          const user = await db.User.create({
            email: profile.emails[0].value,
            firstName: profile.name.familyName,
            lastName: profile.name.givenName,
            avatar: profile.photos[0].value,
            group_id: 2,
            password: bcrypt.hashSync("123456789", bcrypt.genSaltSync(10)),
          });
          return done(null, user);
        }
      } else {
        const user = await db.User.findOne({
          where: {
            email: profile.username + "@gmail.com",
          },
        });
        if (user) {
          done(null, user);
        } else {
          const user = await db.User.create({
            email: profile.username + "@gmail.com",
            firstName: "",
            lastName: profile.username,
            avatar: profile._json.avatar_url,
            group_id: 2,
            password: bcrypt.hashSync("123456789", bcrypt.genSaltSync(10)),
          });
          return done(null, user);
        }
      }
    }
  )
);

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
// passport.deserializeUser((user, done) => {
//   db.User.findByPk(user.id).then((user) => {
//     done(null, user);
//   });
// });
