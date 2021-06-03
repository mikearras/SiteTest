module.exports = function () {
    var express = require('express');
    var router = express.Router();

    function getAuthors(res, mysql, context, complete) {
        mysql.pool.query("SELECT authorID, firstName, lastName FROM AuthorRecords", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.authors = results;
            complete();
        });
    }


    function getAuthorbyLastName(req, res, mysql, context, complete) {
        var query = "SELECT firstName, lastName, authorID FROM AuthorRecords WHERE lastName = ?";
        console.log(req.params)
        var inserts = [req.params.lastName]
        mysql.pool.query(query, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.authors = results;
            complete();
        });
    }


    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteFunctions.js"];
        context.css = ["styles.css"];
        var mysql = req.app.get('mysql');
        getAuthors(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('authorRecord', context);
            }
        }
    });

    /*Display all people from a given homeworld. Requires web based javascript to delete users with AJAX*/
    router.get('/filter/:author_id', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filterAuthorByLastName.js"];
        var mysql = req.app.get('mysql');
        getAuthorbyLastName(req, res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('authorRecord', context);
            }

        }
    });



    /* Adds an Author*/

    router.post('/', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO AuthorRecords (firstName, lastName) VALUES (?,?)";
        // these insert values should match the variables in authorRecord.handlebars
        var inserts = [req.body.firstName, req.body.lastName];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/authorRecord');
            }
        });
    });


    router.delete('/:id', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM  AuthorRecords WHERE authorID = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(error);
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            } else {
                res.status(202).end();
            }
        })
    })

    return router;
}();
