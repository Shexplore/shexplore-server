'use strict';

var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt');

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
        knex.insert({"username":uname}).into('profile').then(function(){
          callback();
        }).catch(function(err){
          console.log(err);
          callback(err);
        });
      }).catch(function(err){
        console.log(err);
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
    console.log(dat);
    if(data.verification != ""){
      if(data.verification == password){
        knex('users').where({
          id: data.id
        }).update({
          verification:""
        }).then(function(){
          callback(new Error("account activated"),undefined,"messages.account.activated");
        });
      }
    }else{
      bcrypt.compare(password,data.password,function(err,res){
        if(err){
          console.log(err);
          callback(err,undefined,"messages.login.failure.generic");
          return;
        }
        if(res){
          callback(undefined,uname,undefined);
        }else{
          callback(undefined,undefined,"messages.login.failure.passwordIncorrect");
        }
      });
    }
  });
}



/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.username){
    res.redirect('/profile');
  }else{
    res.redirect('/login/login');
  }
});

router.get('/login', function(req, res, next) {
  if(req.li){res.redirect('/');return;};
  res.render("login",{username:req.session.username});
});

router.get('/login/:username/:verification', function(req, res, next) {
  if(req.li){res.redirect('/');return;};
  verifyUser(req.params.username,req.params.verification,req.db,function(err,username,status){
    if(err){
      console.log(err);
      res.redirect('checkStatus');
      return;
    }
    req.session.username = username;
    res.redirect('checkStatus');
  });
});

router.get('/checkStatus', function(req, res, next) {
  res.send("username: "+req.session.username);
});

router.post('/login', function(req, res, next) {
  req.requireLogin(false);
  verifyUser(req.body.username,req.body.password,req.db,function(err,username,status){
    if(err){
      console.log(err);
      res.status(500); // THIS LINE MIGHT CRASH THINGS, IF IT DOES, REMOVE IT
      res.redirect('/login?status='+status); // fix security, don't add status
      return;
    }
    if(status){
      res.redirect('login?status='+status);
      return;
    }
    req.session.username = username;
    res.redirect('/login');
  });
});

router.post('/signup', function(req, res, next) {
  req.requireLogin(false);
  registerUser(req.body.username,req.body.password,req.body.email,req.db,function(err){
    if(err){
      console.log(err);
      return;
    }
    res.redirect("login");
  });
});

router.get('/signup', function(req, res, next) {
  req.requireLogin(false);
  res.render("signup",{username:req.session.username});
});

router.post('/logout', function(req, res, next) {
  req.session.username = undefined;
  res.redirect('/login/login');
});

module.exports = router;
