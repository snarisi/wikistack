var express = require('express');
var mongoose = require('mongoose');
var Page = require('../models').Page;
var User = require('../models').User;

var router = express.Router();

router.get('/', function(req, res) {
  User.find().exec()
    .then(function(users) {
      res.render('users', { title: 'Users', users: users });
  });
});

router.get('/:id', function(req, res) {
  var userId = req.params.id;
  var username;
  
//  User.findById(userId)
//    .exec()
//    .then(function(user) {
//      username = user.name;
//      return Page.find({ author: userId }).exec();
//    })
//    .then(function(pages) {
//      res.render(
//        'index', 
//        {title: username + "'s pages", pages: pages }
//      );
//  });
  
  Page.find({ author: userId })
  .populate('author')
  .exec()
  .then(function(pages) {
    console.log(pages);
    res.render(
      'index', 
      { title : pages[0].author.name + "'s pages", 
       pages: pages 
      });
  });
});

module.exports = router;