var express = require('express');
var Page = require('../models').Page;
var User = require('../models').User;
var wiki = express.Router();

wiki.get('/', function(req, res) {
	res.redirect('/');
  // res.status(200).render('index');
});

wiki.post('/', function(req,res, next) {

  User.findOrCreate({
    name: req.body['author-name'],
    email: req.body['author-email']
  }).then(function(authorId) {
    console.log(authorId);
  });

  console.log('\n\AUTHOR\n',author,'\n');

	var page = new Page({
		title: req.body.title,
		content: req.body['content-text'],
		status: req.body['page-status'],
    tags: req.body['page-tags'],
    author: author
	});

  

	page.save(function(err) {
		if(err) res.render('error', { error: err });
	})
	.then(function(page) {
		res.redirect(page.urlTitle);
	})
});

wiki.get('/add/', function(req,res) {
	res.status(200).render('addpage');
});

wiki.get('/:page', function(req, res) {
  Page.findOne({urlTitle: req.params.page}).exec()
    .then(function(page) {
      res.render('wikipage', {page: page});
  });
});

wiki.get('/:page/similar', function(req, res) {
  Page.findOne({urlTitle: req.params.page})
  .then(function(page) {
    return Page.findSimilar(page);
  })
  .then(function(tagsPages) {
    res.render('index', { title: 'Similar Pages', pages: tagsPages });
  })
})

module.exports = wiki;