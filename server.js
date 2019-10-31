const express = require('express');
const routes = require('./app/routes');

var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'example',
  database: 'facts'
})

connection.connect()

// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//   if (err) throw err

//   console.log('The solution is: ', rows[0].solution)
// })

const app = express();

// set our port
const port = process.env.PORT || 8080;

// routes
app.use('/', routes);

// start app at localhost:8080
app.listen(port);

console.log(`Listening on ${port}`);
module.exports = app;
