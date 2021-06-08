// import http from 'http';
var http = require("http");

http
  .createServer(function (req, res) {
    res.end("Welcome to Node js {new edit 2}");
  })
  .listen(3000);

console.log("server created at port number 3000");
