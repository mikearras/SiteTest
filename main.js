/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

var express = require('express');
var exphbs = require('express-handlebars');
let mysql = require('mysql');
var db = require('./dbcon.js');


var app = express();
app.use('/static', express.static('public'));
app.set('port', process.argv[2]);
app.use('/', express.static('public'));
app.use('/home', express.static('public'));
app.use('/libraryMember', express.static('public'));
app.use('/order', express.static('public'));
app.use('/catalogItem', express.static('public'));
app.use('/item', express.static('public'));
app.use('/authorRecord', express.static('public'));


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/home', function (req, res) {
  res.render('home');
});

app.get('/libraryMember', function (req, res) {
  let query = 'SELECT memberID, firstName, lastName FROM Members;';
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400);
			return;
		}
		res.status(200).render('libraryMember');
  });
});


app.get('/order', function (req, res) {
  let query = 'SELECT date, orderNumber, memberID FROM Orders;';
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400);
			return;
		}
		res.status(200).render('order');
	});
});

app.get('/catalogItem', function (req, res) {
  let query = 'SELECT itemID, checkedOut, checkoutPeriod FROM CatalogItems;';
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400);
			return;
		}
		res.status(200).render('catalogItem');
	});
});

app.get('/item', function (req, res) {
  let query = 'SELECT itemID, itemType, title, datePublished FROM Items;';
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400);
			return;
		}
		res.status(200).render('item');
	});
});

app.get('/authorRecord', function (req, res) {
  let query = 'SELECT authorID, itemID FROM AuthorItems;';
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400);
			return;
		}
		res.status(200).render('authorRecord');
	});
});




app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});