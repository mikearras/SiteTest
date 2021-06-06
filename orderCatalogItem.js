module.exports = function () {
    var express = require('express');
    var router = express.Router();


    function getOrders(res, mysql, context, complete) {
        // mysql.pool.query("SELECT orderNumber, DATE_FORMAT(orderDate, '%a, %d %b %Y ') AS orderDate FROM Orders", function (error, results, fields) {

        mysql.pool.query("SELECT  DATE_FORMAT(Orders.orderDate, '%a, %d %b %Y ') AS orderDate, Orders.orderNumber, Member.firstName, Member.lastName FROM Orders, Member WHERE Orders.memberID = Member.memberID", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.order = results;
            complete();
        });
    }

    function getCatalogItems(res, mysql, context, complete) {
        mysql.pool.query("SELECT  CatalogItems.catalogID, CatalogItems.checkedOut, CatalogItems.checkoutPeriod, ItemData.title, ItemData.itemType FROM OrderCatalogItems, CatalogItems, ItemData WHERE OrderCatalogItems.catalogID = CatalogItems.catalogID AND ItemData.itemID = CatalogItems.itemID", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.catalogItem = results;
            complete();
        });

    }


    function getOrderCatalogItems(res, mysql, context, complete) {
        mysql.pool.query("SELECT catalogID, orderNumber FROM OrderCatalogItems", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.orderCatalogItem = results;
            complete();
        });

    }


    // Display all OrderCatalogItems

    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.css = ['styles.css'];
        var mysql = req.app.get('mysql');

        getOrders(res, mysql, context, complete);
        getCatalogItems(res, mysql, context, complete);
        getOrderCatalogItems(res, mysql, context, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 3) {
                console.log(context.catalog);
                res.render('orderCatalogItem', context);
            }
        }

    });


    /* Adds an orderCatalogItem*/

    router.post('/', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO OrderCatalogItems (orderNumber, catalogID) VALUES (?,?)";
        var inserts = [req.body.orderNumber, req.body.catalogID];
        console.log(inserts);
        console.log(req.body);
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/orderCatalogItem');
            }
        });
    });

    return router;
}();