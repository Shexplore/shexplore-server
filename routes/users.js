'use strict';

var express = require('express');
var router = express.Router();

function User(uname,password,email){
  if(password){
    // register a new user
//TODO generate a random verification uuid with node-uuid and uuid.v4()
    var verification = "querty";
    bcrypt.hash(password, 8, function(err, hash) {
      if(err){
        console.log(err);
        return;
      }
      new AccountModel.User({name:uname,password:hash,email:email}).save().then(function(model) {
        console.log('added user',model)
      }).catch(function(err){
        callback(err);
      });
    });
  }else{
    // access the current user
    this.uname = uname;
  }
}



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/profile', function(req, res, next) {
  res.render("profile",{username:"unknown",level:1,badges:[],projects:[]});
});

router.get('/login', function(req, res, next) {
  res.render("login");
});

router.post('/login', function(req, res, next) {
});

router.get('/signup', function(req, res, next) {
  res.render("signup");
});

module.exports = router;
