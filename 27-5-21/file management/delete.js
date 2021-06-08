fs = require("fs");

fs.unlink("demo.txt", function (err) {
  if (err) throw err;
  console.log("File deleted");
});
