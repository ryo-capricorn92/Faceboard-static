var User = require('./userModel');
var jwt = require('jwt-simple');
var secret = process.env.AUTH_SECRET || "KeYbOaRdCaT";

module.exports = {

  signIn: function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.signIn(username, password)
      .then(function (foundUser) {
        if (!foundUser) {
          res.sendStatus(401, 'user is not valid');
        } else {
          var token = jwt.encode(foundUser, secret);
          res.json({token: token});
        }
      });
  },

  signUp: function (req, res) {

    var name = req.body.username;
    var password = req.body.password;

    User.signUp(name, password)
      .then(function (created) {
        res.sendStatus(created ? 201 : 'Not created');
      });
  }
};