var express = require('express');
var router = express.Router();

var UserController = require('./controllers/front/UserController.js');

router.get('/', function (req, res, next) {
  res.render('home');
});

router.post('/front/user/save', UserController.save);

router.post('/front/user/find', UserController.find);

router.post('/front/user/findOne', UserController.findOne);

module.exports = router;
