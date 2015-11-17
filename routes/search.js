var express = require('express');
var Page = require('../models').Page;
var User = require('../models').User;

var search = express.Router();

search.get('/', function(req, res) {
  res.render('search');
});

search.get('/results', function(req, res) {
  res.json(req.query['search-tags']);
});

module.exports = search;