var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_bonacib',
  password        : '0816',
  database        : 'cs340_bonacib'
});
module.exports.pool = pool;