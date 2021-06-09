var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/home", function (req, res, next) {
  res.render("home");
});

router.get("/master", function (req, res, next) {
  res.render("master");
});

router.get("/about", function (req, res, next) {
  res.render("about");
});

router.get("/contact", function (req, res, next) {
  res.render("contact");
});

router.get("/form", function (req, res, next) {
  res.render("form");
});

router.post("/form-process", function (req, res, next) {
  console.log(req.body);
  // var name = req.body.name;
  // var age = req.body.age;
  var sub1 = parseInt(req.body.sub1);
  var sub2 = parseInt(req.body.sub2);
  var sub3 = parseInt(req.body.sub3);
  var sub4 = parseInt(req.body.sub4);

  res.render("ans", {
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    recoveryEmail: req.body.recoveryEmail,
    mobile: req.body.mobile,
    password: req.body.password,
    sub1: sub1,
    sub2: sub2,
    sub3: sub3,
    sub4: sub4,

    resultantColour:
      sub1 > 33 && sub2 > 33 && sub3 > 33 && sub4 > 33 ? "green" : "red",
    result: sub1 > 33 && sub2 > 33 && sub3 > 33 && sub4 > 33 ? "pass" : "fail",
  });
});

router.get("/just-another-url", function (req, res, next) {
  // res.send("created a just another url");
  res.render("trial/t");
});

module.exports = router;
