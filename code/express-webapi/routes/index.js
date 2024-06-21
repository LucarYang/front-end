var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login", (req, res) => {
  res.send("login");
});

router.get("/menu", (req, res) => {
  res.send("menu");
});

module.exports = router;
