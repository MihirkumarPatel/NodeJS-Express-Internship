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
  res.send("respond with a Category");
});

// Add Category data
router.get("/add", function (req, res, next) {
  res.render("category/add-form");
});

router.post("/add-process", function (req, res, next) {
  console.log(req.body);

  data = {
    category_name: req.body.name,
  };

  connection.query(
    "insert into tbl_category set ?",
    data,
    function (err, result) {
      if (err) throw err;
      res.redirect("/category/add");
    }
  );
});

//display Category data
router.get("/display", function (req, res, next) {
  connection.query("select * from tbl_category", function (err, db_rows) {
    if (err) throw err;
    console.log(db_rows);
    res.render("category/display", {
      row: db_rows,
    });
  });
});

//delete Category data
router.get("/delete/:id", function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  connection.query(
    "delete from tbl_category where category_id = ?",
    [id],
    function (err, db_rows) {
      if (err) throw err;
      console.log(db_rows);
      res.redirect("/category/display");
    }
  );
});

// edit Category data
router.get("/edit/:id", function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  connection.query(
    "select * from tbl_category where category_id = ?",
    [id],
    function (err, db_rows) {
      if (err) throw err;
      console.log(db_rows);
      res.render("category/edit", {
        row: db_rows[0],
      });
    }
  );
});
router.post("/edit/:id", function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  connection.query(
    "update tbl_category set category_name = ? where category_id = ?",
    [req.body.name, id],
    function (err, db_rows) {
      if (err) throw err;
      res.redirect("/category/display");
    }
  );
});

module.exports = router;
