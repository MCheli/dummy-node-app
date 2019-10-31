var http = require("https");

var options = {
  "method": "GET",
  "hostname": "cat-fact.herokuapp.com",
  "path": "/facts",
  "headers": {
    "User-Agent": "PostmanRuntime/7.19.0",
    "Accept": "*/*",
    "Cache-Control": "no-cache",
    "Postman-Token": "777386c1-5793-4871-becc-65e7a98ebcb1,53291e69-6ec4-4b96-8e18-4f251d57d6ad",
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