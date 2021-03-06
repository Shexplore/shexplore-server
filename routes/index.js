'use strict';

var express = require('express');
var router = express.Router();

var projects = [];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Home',
    projects: projects
  });
});

router.use('/discuss', require('./discuss'))

router.use('/login', require('./login'));
router.use('/users', require('./users'));
router.use('/profile', require('./profile'));

module.exports = router;
