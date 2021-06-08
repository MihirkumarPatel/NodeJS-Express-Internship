fs = require("fs");

fs.writeFile("demo.txt", "hello world", function (err) {
  if (err) throw err;
  console.log("File created...");
});
