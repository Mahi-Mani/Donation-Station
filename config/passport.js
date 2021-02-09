var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

passport.use(new LocalStrategy(
  {
    usernameField: "username"
  },
  function (username, password, done) {
    console.log("Username from passport file", username);
    console.log("*****PASSWORD***************");
    console.log(password);
    console.log(typeof password);
    db.User.findOne({
      where: {
        username: username
      }
    }).then(function (dbUser) {
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect username!"
        });
      } else if (!dbUser.comparePassword(password)) {
        return done(null, false, {
          message: "Incorrect password!"
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