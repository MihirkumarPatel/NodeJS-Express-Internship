// import http from 'http';
var http = require("http");

http
  .createServer(function (req, res) {
    res.end("Welcome to Node js with some changes...");
  })
  .listen(3000);

console.log("server created at port number 3000");
