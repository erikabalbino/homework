var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("welcome");
});

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7; // one week

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
  // res.json(req.body);
  const resQuestion1 = req.body.question1;
  const resQuestion2 = req.body.question2;
  let resQuestion3 = req.body.question3;
  let resQuestion4 = req.body.question4;

  let results = 0.0
  if (resQuestion1 == 1) {
    results += 1
  };
  if (resQuestion2 == 3) {
    results += 1 
  };
  if (resQuestion3[0] == 1 && resQuestion3[1] == 2) {
    results += 1 
  };
  if (resQuestion4[0] == 1 && resQuestion4[1] == 4) {
    results += 1 
  };

  // console.log("results:", results);
  
  const percent = results/4*100;
  let grade = "";
  let greeting = "";

  console.log("percent:", percent);

  switch (true) {
    case  (percent >= 80 && percent <= 100):
        grade = "A";
        greeting = "👏 Congratulations! You did a great job! ☕️ ☕️ ☕️ ☕️ ☕️";
        break;
    case (percent >= 68 && percent <= 79):
        grade = "B";
        break;
    case (percent >= 55 && percent <= 67):
        grade = "C";
        break;
    case (percent >= 50 && percent <= 54):
        grade = "D";
        break;
    case (percent >= 20 && percent <= 49):
        grade = "E";
        break;
    default:
        grade = "F";
}

const returnResults = {
    percent,
    grade, 
    results,
    greeting
  }

  res.cookie("cookieResults", returnResults, {maxAge: COOKIE_MAX_AGE})

  res.redirect("/quiz/results")

})

router.get('/quiz/results', (req, res) =>{
  res.render("results", {result: req.cookies.cookieResults, myName: req.cookies.cookieName});
})



module.exports = router;
