module.exports = function () {
    var express = require('express');
    var router = express.Router();

    function getMembers(res, mysql, context, complete) {
        mysql.pool.query("SELECT memberID, firstName, lastName FROM Member", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.member = results;
            complete();
        });
    }


    function getMember(res, mysql, context, memberID, complete) {
        var sql = "SELECT memberID, firstName, lastName FROM Member WHERE memberID = ?";
        var inserts = [memberID];
        mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.member = results[0];
            complete();
        });
    }

    /* Search for member by last name*/
    function getMemberWithNameLike(req, res, mysql, context, complete) {
        //sanitize the input as well as include the % character
        var query = "SELECT memberID, firstName, lastName  FROM Member WHERE CONCAT(firstName, ' ' , lastName) LIKE " + mysql.pool.escape(req.params.s + '%');
        console.log(query);
        mysql.pool.query(query, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            console.log(query);
            context.member = results;
            complete();
        });
    }


    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteMember.js", "searchMember.js", "showAllMembers.js"];
        context.css = ["styles.css"];
        var mysql = req.app.get('mysql');
        getMembers(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('libraryMember', context);
            }

        }
    });


    // ---- Display of last name search results 
    router.get('/search/:s', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteMember.js", "searchMember.js"];
        context.css = ["styles.css"];
        var mysql = req.app.get('mysql');
        getMemberWithNameLike(req, res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('libraryMember', context);
            }
        }
    });




    router.post('/', function (req, res) {
        var mysql = req.app.get('mysql');
        
        if (req.body.firstName == '') {
            console.log("no full name")
            alert("Please enter full name")
            return false
        }

        if (req.body.lastName == '') {
            console.log("no full name")
            alert("Please enter full name")
            return false
        }

        var sql = "INSERT INTO Member (firstName, lastName) VALUES (?,?)";
        var inserts = [req.body.firstName, req.body.lastName];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/libraryMember');
            }
        });
    });



    router.delete('/:memberID', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Member WHERE memberID=?";
        var inserts = [req.params.memberID];
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


    /* Display one person for the specific purpose of updating people */

    router.get('/:memberID', function (req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateMember.js"];
        var mysql = req.app.get('mysql');
        getMember(res, mysql, context, req.params.memberID, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('updateMember', context);
            }

        }
    });

    /* The URI that update data is sent to in order to update a person */
    router.put('/:memberID', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Member SET firstName=?, lastName=? WHERE memberID=?";
        var inserts = [req.body.firstName, req.body.lastName, req.params.memberID];
        console.log(req.body.firstName, req.body.lastName, req.params.memberID)
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.status(200);
                res.end();
            }
        });
    });

    return router;
}();

