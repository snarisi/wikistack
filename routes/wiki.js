var express = require('express');
var Page = require('../models').Page;
var User = require('../models').User;
var wiki = express.Router();

wiki.get('/', function(req, res) {
	res.redirect('/');
  // res.status(200).render('index');
});

wiki.post('/', function(req,res) {
	var page = new Page({
		title: req.body.title,
		// urlTitle: ' ',
		content: req.body['content-text'],
		status: req.body['page-status'],
		// author: req.body['author-name']
	});

	page.save(function(err) {
		if(err) res.render('error', { error: err });
	})
	.then(function() {
		res.redirect('/');
	})
	// res.json(req.body);
	// res.status(201).render('index');
});

wiki.get('/add/', function(req,res) {
	res.status(200).render('addpage');
});

module.exports = wiki;