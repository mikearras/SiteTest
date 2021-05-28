module.exports = function(){
    var express = require('express');
    var router = express.Router();

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

    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        // context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getOrders(res, mysql, context, complete);
        getMembers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('order', context);
            }
        }
    });

    /* Adds an order*/

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Orders (orderDate, memberID) VALUES (?,?)";
        // these insert values should match the variables in authorRecord.handlebars
        var inserts = [req.body.orderDate, req.body.memberID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/order');
            }
        });
    });

    return router;
}();