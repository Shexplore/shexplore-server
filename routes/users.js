'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(req.session.username){
    res.send('this page will have things sometime');
  }else{
    res.redirect('/login');
  }
});

router.get('/:user',function(req,res,next){
  if(req.session.username){
    // you can update this to an actual page, the code below will
    // work if you adjust the res.render to do something useful
    // but I don't feel like making a temp page
    /*
      req.db('profile')
        .where({'username':req.params.user})
        .select().then(function(dat){
        res.render('the page', dat[0])
      });
    */
    req.db('profile')
      .where({'username':req.params.user})
      .select().then(function(dat){
      res.send(dat[0]);
    });
  }else{
    res.redirect('/login?message=messages+login+noAccess');
  }
});

module.exports = router;
