'use strict';

var express = require('express');
var router = express.Router();

// GET discuss page.
router.get('/', function (req, res, next) {
  res.render('discuss', {
    title: 'Discuss'
  });
});

module.exports = router;
