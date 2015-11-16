var express = require('express');
var wiki = express.Router();

wiki.get('/', function(req, res) {
	res.redirect('/');
  // res.status(200).render('index');
});

wiki.post('/', function(req,res) {
	res.status(201).render('index');
});

wiki.get('/add/', function(req,res) {
	res.status(200).render('addpage');
});

module.exports = wiki;