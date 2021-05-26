/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var PORT = 5051

var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('mysql', mysql);
app.use('/authorRecord', require('./authorRecord.js'), express.static('public'));
app.use('/catalogItem', require('./catalogItem.js'));
app.use('/item', require('./item.js'));
app.use('/order', require('./order.js'));
app.use('/', express.static('public'));
app.use('/home', express.static('public'));
app.use('/libraryMember', require('./libraryMember.js'), express.static('public'));
// app.use('/order', express.static('public'));
// app.use('/catalogItem', express.static('public'));
// app.use('/item', express.static('public'));
// app.use('/authorRecord', require('./authorRecord.js'));


// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');
// app.set('mysql', mysql);


 app.get('/home', function (req, res) {
  res.render('home');
});

// app.get('/libraryMember', function (req, res) {
//   let query = 'SELECT memberID, firstName, lastName FROM Member;';
// 	db.pool.query(query, function(error, rows, fields){
// 		if(error){
// 			console.log("Query Failure. Error Code: " + error.code);
// 			res.status(400);
// 			return;
// 		}
// 		res.status(200).render('libraryMember', {member: rows});
//   });
// });


// app.get('/order', function (req, res) {
//   let query = 'SELECT date, orderNumber, memberID FROM Orders;';
// 	db.pool.query(query, function(error, rows, fields){
// 		if(error){
// 			console.log("Query Failure. Error Code: " + error.code);
// 			res.status(400);
// 			return;
// 		}
// 		res.status(200).render('order');
// 	});
// });

// app.get('/catalogItem', function (req, res) {
//   let query = 'SELECT itemID, checkedOut, checkoutPeriod FROM CatalogItems;';
// 	db.pool.query(query, function(error, rows, fields){
// 		if(error){
// 			console.log("Query Failure. Error Code: " + error.code);
// 			res.status(400);
// 			return;
// 		}
// 		res.status(200).render('catalogItem');
// 	});
// });

// app.get('/item', function (req, res) {
//   let query = 'SELECT itemID, itemType, title, datePublished FROM ItemData;';
// 	db.pool.query(query, function(error, rows, fields){
// 		if(error){
// 			console.log("Query Failure. Error Code: " + error.code);
// 			res.status(400);
// 			return;
// 		}
// 		res.status(200).render('item');
// 	});
// });

// app.get('/authorRecord', function (req, res) {
//   let query = 'SELECT authorID, firstName, lastName FROM AuthorRecords;';
// 	db.pool.query(query, function(error, rows, fields){
// 		if(error){
// 			console.log("Query Failure. Error Code: " + error.code);
// 			res.status(400);
// 			return;
// 		}
// 		res.status(200).render('authorRecord', {author: rows});
// 	});
// });




app.listen(PORT, function () {
  console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});

