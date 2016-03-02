var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);

// var dbUrl = 'mongodb://120.24.208.135:2000/anbf';
var dbUrl = 'mongodb://localhost:2000/anbf';

mongoose.connect(dbUrl, function (err) {
  if (err) {
    console.log('数据库连接失败');
  }
  else {
    console.log('数据库连接成功');
  }
});

var app = express();

app.locals.app = { name: 'NABF' };

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
require('./utils/LogConfigurator.js').config(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: app.locals.app.name,
  store: new mongoStore({
    url: dbUrl,
    collection: 'sessions'
  })
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes.js'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
