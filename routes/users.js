'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('users page');
});

router.get('/:user',function(req,res,next){
  res.send('this page will contain information about '+req.params.user+" once it exists");
});

module.exports = router;
