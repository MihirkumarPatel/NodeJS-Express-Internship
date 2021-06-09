var express = require("express");
var router = express.Router();

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodedemo",
});

connection.connect(function (err) {
  if (err) console.log("connection issue");
  else console.log("db connected");
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a User");
});

// Add Users data
router.get("/add", function (req, res, next) {
  res.render("users/add-form");
});

router.post("/add-process", function (req, res, next) {
  console.log(req.body);

  data = {
    user_name: req.body.name,
    user_email: req.body.email,
    user_mobile: req.body.mobile,
    user_password: req.body.password,
    user_age: req.body.age,
    user_address: req.body.address,
  };

  connection.query("insert into tbl_user set ?", data, function (err, result) {
    if (err) throw err;
    res.redirect("/users/add");
  });
});

//display Users data
router.get("/display", function (req, res, next) {
  connection.query("select * from tbl_user", function (err, db_rows) {
    if (err) throw err;
    console.log(db_rows);
    res.render("users/display", {
      row: db_rows,
    });
  });
});

//delete Users data
router.get("/delete/:id", function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  connection.query(
    "delete from tbl_user where user_id = ?",
    [id],
    function (err, db_rows) {
      if (err) throw err;
      console.log(db_rows);
      res.redirect("/users/display");
    }
  );
});

// edit Users data
router.get("/edit/:id", function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  connection.query(
    "select * from tbl_user where user_id = ?",
    [id],
    function (err, db_rows) {
      if (err) throw err;
      console.log(db_rows);
      res.render("users/edit", {
        row: db_rows[0],
      });
    }
  );
});

router.post("/edit/:id", function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  connection.query(
    "update tbl_user set user_name = ?, user_email = ?, user_mobile = ?, user_password = ?, user_age = ?, user_address  = ? where user_id = ?",
    [
      req.body.name,
      req.body.email,
      req.body.mobile,
      req.body.password,
      req.body.age,
      req.body.address,
      id,
    ],
    function (err, db_rows) {
      if (err) throw err;
      res.redirect("/users/display");
    }
  );
});

module.exports = router;
