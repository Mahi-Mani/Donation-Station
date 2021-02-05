var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

passport.use(new LocalStrategy(
  {
    usernameField: "username"
  },
  function (username, password, done) {
    console.log(username);
    db.User.findOne({
      where: {
        username: username
      }
    }).then(function (dbUser) {
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect username!"
        });
      }
      return done(null, dbUser);
    })
  }
));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});

module.exports = passport;