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
  res.send("respond with a Product");
});

// Add Products data
router.get("/add", function (req, res, next) {
  res.render("products/add-form");
});

router.post("/add-process", function (req, res, next) {
  console.log(req.body);

  data = {
    product_name: req.body.name,
    product_details: req.body.details,
    product_price: req.body.price,
  };

  connection.query(
    "insert into tbl_product set ?",
    data,
    function (err, result) {
      if (err) throw err;
      res.redirect("/products/add");
    }
  );
});

//display Products data
router.get("/display", function (req, res, next) {
  connection.query("select * from tbl_product", function (err, db_rows) {
    if (err) throw err;
    console.log(db_rows);
    res.render("products/display", {
      row: db_rows,
    });
  });
});

//delete Products data
router.get("/delete/:id", function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  connection.query(
    "delete from tbl_product where product_id = ?",
    [id],
    function (err, db_rows) {
      if (err) throw err;
      console.log(db_rows);
      res.redirect("/products/display");
    }
  );
});

// edit Products data
router.get("/edit/:id", function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  connection.query(
    "select * from tbl_product where product_id = ?",
    [id],
    function (err, db_rows) {
      if (err) throw err;
      console.log(db_rows);
      res.render("products/edit", {
        row: db_rows[0],
      });
    }
  );
});
router.post("/edit/:id", function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  connection.query(
    "update tbl_product set product_name = ?, product_details = ?, product_price = ? where product_id = ?",
    [req.body.name, req.body.details, req.body.price, id],
    function (err, db_rows) {
      if (err) throw err;
      res.redirect("/products/display");
    }
  );
});

module.exports = router;
