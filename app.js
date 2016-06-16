'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Localization = require('./app/localization/index');

var app = express();

var routes = require('./routes/index');

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./dev.db.sqlite"
  },
  useNullAsDefault: true,
  debug: true
});

var session = require('express-session');

var langs = {
  english: new Localization('en_US')
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(session({
  secret: 'undefined',
  saveUninitialized:false,
  resave:false
}));
app.use(function(req,res,next){
  req.db = knex;
  req.localization = langs[req.session.language || "english"];
  if(!req.session.language)req.session.language = "english"

  req.li = req.session.username === undefined ? false : true;

  req.requireLogin = function(yn){
    // Usage: res.requireLogin([bool requireLogin = true]);
    yn = yn === undefined ? true : yn;
    console.log('checking', req.session.username, yn);
    if(req.li){
      if(!yn){ res.redirect('/profile');return true;};
    }else{
      if(yn) {res.redirect('/login');return true;};
    }
    return false;
  }

  // Checks if a user is logged in
  // Usage: if(req.li){res.redirect('/');return;};

  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

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

} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      code: err.status,
      error: {}
    });
  });
}

module.exports = app;
