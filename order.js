module.exports = function () {
    var express = require('express');
    var router = express.Router();


    function getOrders(res, mysql, context, complete) {
        mysql.pool.query("SELECT DATE_FORMAT(orderDate, '%a, %d %b %Y ') AS orderDate, orderNumber, memberID FROM Orders", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.order = results;
            console.log(context.order);
            complete();
        });

    }



    function getMembers(res, mysql, context, complete) {
        mysql.pool.query("SELECT memberID, firstName, lastName FROM Member", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.members = results;
            complete();
        });
    }


    //--Show/display  all orders.

    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.css = ["styles.css"];
        var mysql = req.app.get('mysql');
        getOrders(res, mysql, context, complete);
        getMembers(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('order', context);
            }
        }
    });

    /* Adds an order*/

    router.post('/', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Orders (orderDate, memberID, orderNumber) VALUES (?,?,?)";
        var inserts = [req.body.orderDate, req.body.memberID, req.body.orderNumber];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/order');
            }
        });
    });

    return router;
}();
