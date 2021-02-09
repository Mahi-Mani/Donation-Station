var bcrypt = require("bcryptjs");
var salt;
var hash;

module.exports = function (sequelize, DataTypes) {

  var User = sequelize.define('User', {

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 10]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 10]
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    }
  });

  User.associate = function (models) {

    User.belongsToMany(models.DonatorCard, {
      through: {
        model: models.Request
      }
    });

    User.belongsToMany(models.RequestorCard, {
      through: {
        model: models.Donation
      }
    });

  };

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  }

  User.addHook("beforeCreate", function (user) {
    salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(user.password, salt, null);
    user.password = hash;
  });

  return User;
};