'use strict';

var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt-nodejs');

function registerUser(uname,password,email,knex,callback){
  if(password){
    // register a new user
//TODO generate a random verification uuid with accounts/generate
    var verification = "qwerty";
    bcrypt.hash(password, 10, function(err, hash) {
      if(err){
        console.log(err);
        return;
      }
      knex.insert({"username":uname,"password":hash,"email":email,"verification":verification}).into('users').then(function(){
        callback();
      }).catch(function(err){
        callback(err);
      });
    });
  }
}

function verifyUser(uname,password,knex,callback){
  knex('users').where({
    username: uname
  }).select('id','verification','password').then(function(dat){
    var data = dat[0]
    if(data.verification != ""){
      if(data.verification == password){
        knex('users').where({
          id: data.id
        }).update({
          "verification": ""
        }).then(function(){
          callback(undefined,undefined,"messages.account.activated");
        });
      }
    }else{
      bcrypt.compare(password,data.password,function(err,res){
        callback(err,res ? uname : undefined,undefined);
      });
    }
  });
}



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/profile', function(req, res, next) {
  res.render("profile",{username:req.session.username,level:1,badges:[],projects:[]});
});

router.get('/login', function(req, res, next) {
  res.render("login");
});

router.get('/checkStatus', function(req, res, next) {
  res.send("username: "+req.session.username);
});

router.post('/login', function(req, res, next) {
  verifyUser(req.body.username,req.body.password,req.db,function(err,username,status){
    if(err){
      console.log(err);
      res.redirect('/users/checkStatus');
      return;
    }
    req.session.username = username;
    res.redirect('/users/checkStatus');
  });
});

router.post('/signup', function(req, res, next) {
  registerUser(req.body.username,req.body.password,req.body.email,req.db,function(err){
    if(err){
      console.log(err);
      return;
    }
    res.redirect("/users/login");
  });
});

router.get('/signup', function(req, res, next) {
  res.render("signup");
});

module.exports = router;
