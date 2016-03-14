var User = require('../../models/User.js');
var ResInfo = require('../../utils/ResInfo.js');

function UserController() {}

UserController.find = function (req, res, next) {
  User.find(req.body.conditions).sort('updateAt').exec(function (err, users) {
    if (err) {
      console.log(err);
      res.json(new ResInfo(-9999, 'err'));
      return;
    }
    res.json(new ResInfo(1, 'succ', { users: users }));
  });
};

UserController.findOne = function (req, res, next) {
  User.findOne(req.body.conditions).exec(function (err, user) {
    if (err) {
      console.log(err);
      res.json(new ResInfo(-9999, 'err'));
      return;
    }
    if (!user) {
      res.json(new ResInfo(-1, 'not found'));
      return;
    }
    res.json(new ResInfo(1, 'succ', { user: user }));
  });
};

UserController.signup = function (req, res, next) {
  new User(req.body.user).save(function (err, user) {
    if (err) {
      console.log(err);
      res.json(new ResInfo(-9999, 'err'));
      return;
    }
    if (!user) {
      res.json(new ResInfo(-1, 'fail'));
      return;
    }
    req.session.user = user;
    res.json(new ResInfo(1, 'succ', { user: user }));
  });
};

UserController.signin = function (req, res, next) {
  User.findOne(req.body.conditions).exec(function (err, user) {
    if (err) {
      console.log(err);
      res.json(new ResInfo(-9999, 'err'));
      return;
    }
    if (!user) {
      res.json(new ResInfo(-1, 'not fount'));
      return;
    }
    req.session.user = user;
    res.json(new ResInfo(1, 'succ', { user: user }));
  });
};

UserController.signout = function (req, res, next) {
  delete req.session.user;
  res.json(new ResInfo(1, 'succ'));
};

UserController.getSession = function (req, res, next) {
  res.json(new ResInfo(1, 'succ', { session: { user: req.session.user } }));
};

module.exports = UserController;
