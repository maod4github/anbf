var express = require('express');

var router = express.Router();

var UserController = require('./controllers/front/UserController.js');

router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/front/user/find', UserController.find);
router.post('/front/user/findOne', UserController.findOne);
router.post('/front/user/signup', UserController.signup);
router.post('/front/user/signin', UserController.signin);
router.post('/front/user/signout', UserController.signout);
router.get('/front/user/getSession', UserController.getSession);

module.exports = router;
