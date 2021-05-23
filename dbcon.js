
const mysql = require('mysql');
const express = require('express');
const app = express();


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
});

db.connect((err) => {
    if (err) {
        console.log("connect error");
    }
    console.log('mysql connected');
});

app.get('/createDB', (req, res) => {
    let sql = 'CREATE DATABASE libraryTest';
    db.query(sql, (err) => {

        res.send("Database Created");

    });

});

app.listen('3000', () => {
    console.log("Started on port 3000")
});