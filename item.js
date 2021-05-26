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


    return router;
}();