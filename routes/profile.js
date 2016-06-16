'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect('edit');
});

router.get('/edit', function(req,res,next){
  res.render('profile');
});

router.post('/update', function(){
  res.redirect('edit');
});

module.exports = router;
