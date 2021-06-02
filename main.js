/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');


var app = express();
var handlebars = require('express-handlebars').create({
  defaultLayout: 'main',
});

app.get('/', (req, res) => {
  res.render('home');
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('public'));

app.set('mysql', mysql);
app.use('/libraryMember', require('./libraryMember.js'));
app.use('/order', require('./order.js'));


app.use(function (req, res) {
  res.status(404);
  res.render('404');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});




app.listen(5051, function () {
  console.log("connected");
});
