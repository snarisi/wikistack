var express = require('express');
var wiki = require('./wiki');
var search = require('./search.js');
var users = require('./users.js')
var Page = require('../models').Page;
var User = require('../models').User;

var router = express.Router();

router.use('/wiki',wiki);
router.use('/search', search);
router.use('/users/', users);

router.get('/', function(req, res) {
  Page.find().exec()
    .then(function(pages) {
      res.render('index', { title: 'WikiStack Pages', pages: pages});
  });
//  res.status(200).render('index');
});



module.exports = router;