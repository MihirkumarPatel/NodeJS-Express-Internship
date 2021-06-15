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
  else console.log("DB connected from users.js route file");
});

/* GET users listing. */
// get pages...
var loggedIn = false;
var name = undefined;
router.get("/", function (req, res, next) {
  // router.get("/:user_email/:user_password", function (req, res, next) {
  loggedIn = true;
  res.render("pages-user/home");
});

router.get("/home", function (req, res, next) {
  if (!loggedIn) res.redirect("/registration");
  res.render("pages-user/home");
});

router.get("/about", function (req, res, next) {
  if (!loggedIn) res.redirect("/registration");
  res.render("pages-user/about");
});

router.get("/contact", function (req, res, next) {
  if (!loggedIn) res.redirect("/registration");
  res.render("pages-user/contact");
});

//display books
router.get("/books", function (req, res, next) {
  if (!loggedIn) res.redirect("/registration");
  connection.query("select * from tbl_book", function (err, result) {
    if (err) throw err;
    res.render("pages-user/books", {
      db_book: result,
    });
  });
});

//display stores having a given book in the inventory
router.get("/stores/:book_name", function (req, res, next) {
  if (!loggedIn) res.redirect("/registration");
  var book_name = req.params.book_name;
  console.log(`
    finding stores for Book: ${book_name}
  `);
  connection.query(
    "select * from tbl_store where book_name = ?",
    [book_name],
    function (err, result) {
      if (err) throw err;
      res.render("pages-user/stores", {
        stores: result,
      });
    }
  );
});

//TODO: check this afterwards...
// When user has clicked on a book in the stores section...
router.get("/booked", function (req, res, next) {
  // res.end(
  //   "Your book has been booked for the next 24 hours.Please collect your book within the time frame. You will be redirected to the books section in 5 secs..."
  // );
  res.write("something");
  res.setTimeout(2000, () => {
    res.redirect("/users/books");
  });
  // setTimeout(() => {
  //   res.redirect("/users/books");
  // }, 5000);
  // setTimeout(res.redirect("/users/books"), 1000);
  // res.end("end");
});

// add, remove, edit, display database for particular store
router.get("/mystore", function (req, res, next) {
  if (!loggedIn) res.redirect("/registration");
  connection.query("select * from tbl_store", function (err, result) {
    if (err) throw err;

    res.render("pages-user/mystore", {
      stores: result,
    });
  });
});

// add book to the db
router.get("/mystore/add-book", function (req, res, next) {
  if (!loggedIn) res.redirect("/registration");
  res.render("pages-user/add-book");
});

router.post("/mystore/add-book-process", function (req, res, next) {
  if (!loggedIn) res.redirect("/registration");
  var data_book = {
    book_name: req.body.book_name,
    book_description: req.body.book_description,
  };
  connection.query(
    "select * from tbl_book where book_name = ?",
    [req.body.book_name],
    function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        connection.query(
          "insert into tbl_book set ?",
          data_book,
          function (err, result) {
            if (err) throw err;
            console.log(result);
          }
        );
      }
    }
  );
  var data_store = {
    store_name: req.body.store_name,
    store_description: req.body.store_description,
    store_address: req.body.store_address,
    store_contact: req.body.store_contact,
    book_name: req.body.book_name,
    book_price: req.body.book_price,
    book_count: req.body.book_count,
  };
  connection.query(
    "insert into tbl_store set ?",
    data_store,
    function (err, result) {
      if (err) throw err;
      console.log(result);
    }
  );
  res.redirect("/users/mystore/add-book");
});

// edit book details...
router.get("/mystore/edit/:store_id", function (req, res, next) {
  if (!loggedIn) res.redirect("/registration");
  var store_id = req.params.store_id;
  console.log(store_id);
  connection.query(
    "select * from tbl_store where store_id = ?",
    [store_id],
    function (err, result) {
      if (err) throw err;
      console.log(result);
      res.render("pages-user/edit-book", {
        store: result[0],
      });
    }
  );
});

router.post("/mystore/edit/:store_id", function (req, res, next) {
  if (!loggedIn) res.redirect("/registration");
  var store_id = req.params.store_id;
  console.log(store_id);
  connection.query(
    "update tbl_store set store_name = ?, store_description = ?, store_address= ?, store_contact = ?, book_name = ?, book_price = ?, book_count = ? where store_id = ?",
    [
      req.body.store_name,
      req.body.store_description,
      req.body.store_address,
      req.body.store_contact,
      req.body.book_name,
      req.body.book_price,
      req.body.book_count,
      store_id,
    ],
    function (err, result) {
      if (err) throw err;
      console.log(result);
      res.redirect("/users/mystore");
    }
  );
});

// delete book from store...
router.get("/mystore/delete/:store_id", function (req, res, next) {
  if (!loggedIn) res.redirect("/registration");
  var store_id = req.params.store_id;
  console.log(store_id);
  connection.query(
    "delete from tbl_store where store_id = ?",
    [store_id],
    function (err, result) {
      if (err) throw err;
      console.log(result);
      res.redirect("/users/mystore");
    }
  );
});

router.get("/logout", function (req, res, next) {
  loggedIn = false;
  res.redirect("/");
});

module.exports = router;
