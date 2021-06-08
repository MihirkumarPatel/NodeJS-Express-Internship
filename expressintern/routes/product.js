var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a product");
});

router.get("/display", function (req, res, next) {
  res.send("respond with a product display");
});

module.exports = router;
