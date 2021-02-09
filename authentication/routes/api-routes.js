var db = require("../../models");
var passport = require("../../config/passport");

module.exports = function (app) {

  app.post("/api/:username", passport.authenticate("local"), function (req, res) {

    res.json(req.user);
    // db.User.findOne({
    //   where: {
    //     username: req.body.username,
    //     password: req.body.password
    //   }
    // }).then(function (dbUser) {
    //   res.json(dbUser);
    // })

  })

  app.post("/api/new/user", function (req, res) {

    db.User.create(req.body).then(function (dbUser) {
      res.json(dbUser);
    })

  })

}