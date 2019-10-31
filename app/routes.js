const express = require('express');
const router = express.Router();

//Routes go here

module.exports = router;


// Example endpoint

router.get('/', function(req, res) {
  res.send("Hello World")
});

router.get('/catfacts', function(req, res) {
    var http = require("https");

    var options = {
    "method": "GET",
    "hostname": "cat-fact.herokuapp.com",
    "path": "/facts",
    "headers": {
        "Accept": "*/*",
        "Cache-Control": "no-cache",
        "Host": "cat-fact.herokuapp.com",
        "Accept-Encoding": "gzip, deflate",
        "Cookie": "connect.sid=s%3AhkjRXScxR4S3z1OkUSdmoH4xITJXomXd.wSYWUg7u25WhPbuzmsFDxYxPJSysAKxp2FvM4g3v7CM",
        "Connection": "keep-alive",
        "cache-control": "no-cache"
    }
    };

    var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });
    });

    req.end();

    res.send("loading catfacts")
})