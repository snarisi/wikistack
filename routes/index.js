var express = require('express');
var wiki = require('./wiki');
var router = express.Router();

router.use('/wiki',wiki);

router.get('/', function(req, res) {
  res.status(200).render('index');
});



module.exports = router;