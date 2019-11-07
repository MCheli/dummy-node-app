const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var SqlString = require('sqlstring');


var connection = mysql.createConnection({
    host: 'dummy-node-app-db-service',
    user: 'root',
    password: 'example',
    database: 'facts'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
});

//Routes go here

module.exports = router;


// Example endpoint

router.get('/', function (req, res) {
    res.send("Hello World")
});

router.get('/catfacts', function (req, res) {

    var queryString = 'SELECT COUNT(*) FROM catfacts';

    var totalFacts
    var randomFact

    connection.query(SqlString.format(queryString), function (err, rows, fields) {
        if (err) throw err
        
        totalFacts = rows[0]['COUNT(*)'];
        randomFact = Math.floor(Math.random() * totalFacts);

        queryString = 'SELECT fact FROM catfacts WHERE id = ' + randomFact;
    
        connection.query(SqlString.format(queryString), function (err, rows, fields) {
            if (err) throw err

            res.send(rows[0]['fact']);
        })
    })
});

router.post('/catfacts', function (req, res) {
    var rp = require('request-promise');

    var options = {
        method: 'GET',
        uri: 'https://cat-fact.herokuapp.com/facts',
        json: true // Automatically stringifies the body to JSON
    };

    rp(options)
        .then(function (body) {

            connection.connect(function (err) {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    return;
                }
            });

            body.all.forEach(element => {
                var queryString = 'INSERT INTO catfacts (fact) VALUES (' + SqlString.escape(element.text) + ')';
                connection.query(SqlString.format(queryString), function (err, rows, fields) {
                    if (err) throw err
                })
            });
            res.sendStatus(200)

        })
        .catch(function (err) {
            // Request Failed
        });
})