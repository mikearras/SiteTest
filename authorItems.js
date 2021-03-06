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


    function getItems(res, mysql, context, complete) {
        mysql.pool.query("SELECT itemID, itemType, title, DATE_FORMAT(datePublished, '%a, %d %b %Y ') AS datePublished FROM ItemData", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.items = results;
            complete();
        });
    }

    function getAuthorItems(res, mysql, context, complete) {
        mysql.pool.query("SELECT AuthorItem.itemID, AuthorItem.authorID, AuthorRecords.firstName, ItemData.title FROM AuthorItem JOIN AuthorRecords ON AuthorRecords.authorID = AuthorItem.authorID JOIN ItemData ON ItemData.itemID = AuthorItem.itemID", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.authoritems = results;
            console.log(results);
            complete();
        });
    }

    // Display all authorItems

    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteAuthorItem.js"];
        context.css = ["styles.css"];
        var mysql = req.app.get('mysql');
        getAuthors(res, mysql, context, complete);
        getItems(res, mysql, context, complete);
        getAuthorItems(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 3) {
                res.render('authorItems', context);
            }
        }
    });

    //---Adds an authorItem (associates an author with an item)

    router.post('/', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO AuthorItem (authorID, itemID) VALUES (?,?)";
        // these insert values should match the variables in authorRecord.handlebars
        var inserts = [req.body.authorID, req.body.itemID];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/authorItems');
            }
        });
    });

    //delete authorItem
    router.delete('/:authorID', function (req, res) {
        console.log("got to delete")
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM AuthorItem WHERE authorID=?";
        var inserts = [req.params.authorID];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(error)
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
