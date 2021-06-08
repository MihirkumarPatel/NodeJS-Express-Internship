fs = require("fs");

fs.appendFile("test.txt", "hello Node js!", function (err) {
  if (err) throw err;
  console.log("File updated");
});
