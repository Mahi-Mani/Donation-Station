var db = require("../../models");
var passport = require("../../config/passport");

module.exports = function (app) {

  app.get("/api/:username/:password", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  })

  app.post("/api/new/user", function (req, res) {

    db.User.create(req.body).then(function (dbUser) {
      res.json(dbUser);
    })

  })

}