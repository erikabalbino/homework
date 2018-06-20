var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("welcome");
});

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7; // uma semana

router.post('/name', (req, res) => {
  const name = req.body.name;

  if (name) {
    res.cookie("name", name, {maxAge: COOKIE_MAX_AGE});
    res.redirect("/quiz");
    // res.send(req.body);
  } else {
    // res.send(req.body);
    res.render("welcome");
  }
})

router.get('/quiz', (req, res) => {
  res.render("quiz");
})

module.exports = router;
