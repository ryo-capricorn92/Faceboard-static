var express = require('express');
var path = require('path');
var userRoutes = require('./db/users/userRoutes');
var bodyParser = require('body-parser');
var db = require('./db/db');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile('/index.html', { root: __dirname });
})

app.post('/signup', userRoutes.signUp);
app.post('/signin', userRoutes.signIn);
app.post('/session/:sessionid', userRoutes.updateSession);
app.get('/findUser', userRoutes.findOneUser);

db.sync().then(function () {
  app.listen(port, function() {
    console.log('Listening on', port);
  });
});
