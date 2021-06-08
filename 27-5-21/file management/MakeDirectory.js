fs = require("fs");
path = require("path");

fs.mkdir(path.join(__dirname, "test"), (err) => {
  if (err) console.log(err);
  console.log("Dir created...");
});
