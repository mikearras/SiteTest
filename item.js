module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getAuthors(res, mysql, context, complete){
        mysql.pool.query("SELECT itemId, itemType, title, datePublished FROM ItemData", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.item  = results;
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
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('item', context);
            }
        }
    });

   /* Adds an Author*/

   router.post('/', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO ItemData (itemId, itemType, title, datePublished) VALUES (?,?, ?, ?)";
    // these insert values should match the variables in authorRecord.handlebars
    var inserts = [req.body.itemId, req.body.itemType, req.body.title, req.body.datePublished];
    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            console.log(JSON.stringify(error))
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.redirect('/item');
        }
        });
    });


    return router;
}();