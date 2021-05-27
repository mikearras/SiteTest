module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getMembers(res, mysql, context, complete){
        mysql.pool.query("SELECT memberID, firstName, lastName FROM Member", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.members  = results;
            complete();
        });
    }

    function getOrders(res, mysql, context, complete){
        mysql.pool.query("SELECT orderDate, orderNumber, memberID FROM Orders", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.order  = results;
            complete();
        });
    }

    function getMemberOrders(res, mysql, context, complete){
        mysql.pool.query("SELECT catalogID, orderNumber FROM OrderCatalogItems", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.memberOrders  = results;
            complete();
        });
    }

    // Display all authorItems

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        // context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getMembers(res, mysql, context, complete);
        getOrders(res, mysql, context, complete);
        getMemberOrders(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('memberOrders', context);
            }
        }
    });

    /* Adds an order*/

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO OrderCatalogItems (catalogID, orderNumber) VALUES (?,?)";
        // these insert values should match the variables in authorRecord.handlebars
        var inserts = [req.body.authorID, req.body.itemID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/memberOrders');
            }
        });
    });

    return router;
}();