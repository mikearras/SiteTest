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
app.use('/catalogItem', require('./catalogItem.js'), express.static('public'));
app.use('/memberOrders', require('./memberOrders.js'), express.static('public'));
app.use('/item', require('./item.js'), express.static('public'));
app.use('/order', require('./order.js'), express.static('public'));
app.use('/', express.static('public'));
app.use('/home', express.static('public'));
app.use('/authorItems', require('./authorItems.js'), express.static('public'));
app.use('/libraryMember', require('./libraryMember.js'), express.static('public'));

// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');
// app.set('mysql', mysql);


 app.get('/home', function (req, res) {
  res.render('home');
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});


app.listen(PORT, function () {
  console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});

