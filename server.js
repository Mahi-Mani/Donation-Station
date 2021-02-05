// Require express
var express = require("express");
var app = express();
const mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var passport = require("./config/passport");
// require("dotenv").config();
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Passport
app.use(session({ secret: "apple", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
require("./routes/apiRoutes.js")(app);
require("./routes/api-Routes.js")(app);
require("./authentication/routes/api-routes.js")(app);
require("./authentication/routes/html-routes.js")(app);

// Requiring our models for syncing
var db = require("./models");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdb");

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});

