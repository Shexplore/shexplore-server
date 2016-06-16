'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect('/profile/edit');
});

router.get('/edit', function(req,res,next){
  if(req.requireLogin(true))return;
  req.db('profile')
  .where({'username':req.session.username})
  .select().then(function(dat){
    console.log(dat);

    delete dat[0].id;
    delete dat[0].username;
    var qal = {};
    for (var index in dat[0]){
      qal[index] = (req.localization.localize('profile.fields.'+index));
    }

    res.render('profile', {'data': dat[0], 'localization': qal, 'username':req.session.username})
  });
});

router.post('/update', function(req,res,next){
  req.requireLogin(true);
  req.db('profile').where({
    username: req.session.username
  }).update({
    'favorite_programming_language': req.body.favorite_programming_language,
    'about_me': req.body.about_me,
    'level': req.body.level,
    'projects_completed': req.body.projects_completed,
    'location': req.body.location,
    'age': req.body.age,
    'real_name': req.body.real_name,
    'friends': req.body.friends,
    'profile_picture': req.body.profile_picture,
    'hobbies': req.body.hobbies,
    'company': req.body.company
  }).then(function(){
    res.redirect('edit');
  }).catch(function(err){
    console.log(err);
    res.redirect('edit?status=edit.failure.generic');
  });
});

module.exports = router;
