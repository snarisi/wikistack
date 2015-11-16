var express = require('express');
var app = express();
var routes = require('./routes/');
var morgan = require('morgan');
var swig = require('swig');
var bodyParser = require('body-parser');
var PORT = 3000;

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache: false});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(routes);
app.use(express.static(__dirname + '/public'));

var server = app.listen(PORT);