var express = require('express');
var Page = require('../models').Page;
var User = require('../models').User;
var wiki = express.Router();

wiki.get('/', function(req, res) {
	res.redirect('/');
  // res.status(200).render('index');
});

wiki.post('/', function(req,res, next) {
	var page = new Page({
		title: req.body.title,
		content: req.body['content-text'],
		status: req.body['page-status'],
        tags: req.body['page-tags']
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

module.exports = wiki;