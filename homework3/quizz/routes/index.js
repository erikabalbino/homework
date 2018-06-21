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
    res.cookie("cookieName", name, {maxAge: COOKIE_MAX_AGE});
    res.redirect("/quiz");
    // res.send(req.body);
  } else {
    // res.send(req.body);
    res.render("welcome");
  }
})

router.get('/quiz', (req, res) => {
  // res.render("quiz");
  res.render("quiz",  {myName: req.cookies.cookieName});
})

router.post('/quiz', (req, res) => {
  // res.json(req.body.question2);
  const resQuestion1 = req.body.question1;
  const resQuestion2 = req.body.question2;

  let results = 0.0
  if (resQuestion1 == 1) {
    results += 1
  }
  if (resQuestion2 == 3) {
    results += 1
  }

  const percent = results/2*100;
  //-> Do the grade calc here
  const grade = "A"
  // res.send(rescalc.toString());
  // res.send(`You scored ${rescalc}%, you got ${results} out of 2 questions`)
  const returnResults = {
    percent,
    grade, 
    results
  }

  res.cookie("cookieResults", returnResults, {maxAge: COOKIE_MAX_AGE})
  // res.cookie("results", rescalc, {maxAge: COOKIE_MAX_AGE})

  res.redirect("/quiz/results")

})

router.get('/quiz/results', (req, res) =>{
  res.render("results", {result: req.cookies.cookieResults, myName: req.cookies.cookieName});
})



module.exports = router;
