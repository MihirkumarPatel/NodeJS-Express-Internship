fs = require("fs");

var data = fs.readFileSync("demo.html");

console.log(data.toString());
