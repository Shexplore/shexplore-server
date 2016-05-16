'use strict';

var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt');

function User(uname,password,email,knex){
  if(password){
    // register a new user
//TODO generate a random verification uuid with accounts/generate
    var verification = "qwerty";
    bcrypt.hash(password, 8, function(err, hash) {
      if(err){
        console.log(err);
        return;
      }
      knex.insert({"username":uname,"password":hash,"email":email,"verification":verification}).into('users').then(function(){
        console.log('added user',arguments)
      })
    });
  }else{
    // access the current user
    this.uname = uname;
    
    // wip
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

router.post('/signup', function(req, res, next) {
  User(req.body.username,req.body.password,req.body.email,req.db);
});

router.get('/signup', function(req, res, next) {
  res.render("signup");
});

module.exports = router;
