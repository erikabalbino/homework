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
  const resQuestion3 = req.body.question3;
  const resQuestion4 = req.body.question4;
  const resQuestion5 = req.body.question5;
  const resQuestion6 = req.body.question6;
  const resQuestion7 = req.body.question7;
  const resQuestion8 = req.body.question8;
  const resQuestion9 = req.body.question9;
  const resQuestion10 = req.body.question10;


  let results = 0.0
  if (resQuestion1 == 1) {
    results += 1
  };

  if (resQuestion2 == 3) {
    results += 1 
  };

  if (resQuestion3 == 2) {
    results += 1
  };

  if (resQuestion4 == 2) {
    results += 1 
  };

  if (resQuestion5 == 2) {
    results += 1 
  };

  if (resQuestion6 == 3) {
    results += 1 
  };

  if (resQuestion7[0] == 1 && resQuestion7[1] == 2) {
    results += 1 
  };

  if (resQuestion8[0] == 1 && resQuestion8[1] == 4) {
    results += 1 
  };

  if (resQuestion9[0] == 2 && resQuestion9[1] == 3 && resQuestion9[2] == 4) {
    results += 1 
  };

  if (resQuestion10[0] == 1 && resQuestion10[1] == 3) {
    results += 1 
  };

  // console.log("results:", results);
  
  const percent = results/10*100;
  let grade = "";
  let greeting = "";

  console.log("percent:", percent);

  switch (true) {
    case  (percent >= 80 && percent <= 100):
        grade = "A";
        greeting = "👏 Congratulations!👏 You did a great job! ☕️ ☕️ ☕️ ☕️ ☕️";
        break;
    case (percent >= 68 && percent <= 79):
        grade = "B";
        greeting = "Nice! Jod Job! ☕️ ☕️ ☕️ ☕️ ";
        break;
    case (percent >= 55 && percent <= 67):
        grade = "C";
        greeting = "Good Job! ☕️ ☕️ ☕️ ";
        break;
    case (percent >= 50 && percent <= 54):
        grade = "D";
        greeting = "👍 ☕️ ☕️ ";
        break;
    case (percent >= 20 && percent <= 49):
        grade = "E";
        greeting = "☕️ ";
        break;
    default:
        grade = "F";
        greeting = "You can do better! 😉 ";
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
