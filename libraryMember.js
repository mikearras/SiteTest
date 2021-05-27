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
	
	
	router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getMembers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('libraryMember', context);
            }
        }
    });
	
	
	
	router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Member (firstName, lastName) VALUES (?,?)";
        // these insert values should match the variables in libraryMember.handlebars
        var inserts = [req.body.firstName, req.body.lastName];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/libraryMember');
            }
        });
    });
	
	    return router;
}();