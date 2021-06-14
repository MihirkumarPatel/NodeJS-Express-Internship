const { log } = require("debug");
var express = require("express");
var router = express.Router();

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "book_perusal",
});

connection.connect(function (err) {
  if (err) console.log("connection issue");
  else console.log("DB connected from index.js route file");
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/index", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/master", function (req, res, next) {
  res.render("master");
});

router.get("/registration", function (req, res, next) {
  res.render("registration");
});

router.post("/registration-process", function (req, res, next) {
  console.log(req.body);
  var data = {
    user_name: req.body.name,
    user_age: req.body.age,
    user_email: req.body.email,
    user_mobile: req.body.mobile,
    user_password: req.body.password,
  };

  connection.query("insert into tbl_user set ?", data, function (err, result) {
    if (err) throw err;
    console.log("new user Registered");
    res.redirect("/users/");
  });
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post("/login-process", function (req, res, next) {
  console.log(req.body);
  var email = req.body.email;
  var password = req.body.password;
  connection.query(
    "select * from tbl_user where user_email = ?",
    [email],
    function (err, result) {
      if (err) throw err;
      console.log(result);
      if (result.length == 0) {
        console.log("Incorrect userId");
        res.redirect("/login");
      } else if (result[0].user_password != password) {
        console.log("Incorrect password");
        res.redirect("/login");
      } else {
        console.log("logged in successfully...");
        // res.redirect("/users/home");
        res.redirect("/users/");
        // res.redirect("/users/${email}/${password}");

        // res.render("/pages-user/home", {
        //   user_name: req.body.name,
        // });
      }
    }
  );
});

router.get("/about", function (req, res, next) {
  res.render("about");
});

router.get("/contact", function (req, res, next) {
  res.render("contact");
});

module.exports = router;
