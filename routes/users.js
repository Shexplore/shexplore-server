'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('users page');
});

router.get('/:user',function(req,res,next){
  knex('profile').where({
    username: uname
  }).where({'username':req.params.user}).fetch().then(function(dat){
    res.send(dat[0]);
  });
});

module.exports = router;
