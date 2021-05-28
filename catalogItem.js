module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getAuthors(res, mysql, context, complete){
        mysql.pool.query("SELECT catalogID, itemID, checkedOut, checkoutPeriod FROM CatalogItems", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.catalogItem  = results;
            complete();
        });
    }

    
    function getItems(res, mysql, context, complete){
        mysql.pool.query("SELECT itemID, itemType, title, datePublished FROM ItemData", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.items  = results;
            complete();
        });
    }


    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        // context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getAuthors(res, mysql, context, complete);
        getItems(res, mysql, context, complete)
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('catalogItem', context);
            }
        }
    });

    /* Adds an catalog Item*/

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO CatalogItems (itemID, checkedOut, checkoutPeriod) VALUES (?, ?,?)";
        // these insert values should match the variables in authorRecord.handlebars
        var inserts = [req.body.itemID, req.body.checkedOut, req.body.checkoutPeriod];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/catalogItem');
            }
        });
    });




    return router;
}();