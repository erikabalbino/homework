const express = require('express');
const knex = require("../db/index");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  
  knex
  .insert({
      name: req.body.name,
      logoUrl: req.body.logoUrl,
      members: req.body.members
  })
  .into("cohorts")
  .returning("*")
  .then(([cohort]) => {
      // console.log("Cohort insert result:", cohort);
      // res.send(cohort);
      res.redirect(`/cohorts/${cohort.id}`);
  });

})

router.get('/index', (req, res) => {
  knex
  .select("*")
  .orderBy('createdAt', 'desc')
  .from("cohorts")
  .then(cohorts => {
      res.render("index", { allCohorts: cohorts });
      // res.json(cohorts);
  });

})

router.get('/:id', (req, res) => {
  knex
  .select("*")
  .from("cohorts")
  .where({ id: req.params.id }) 
  .then(results => {
  const [cohort] = results;
  // res.send(cohort);
  res.render("cohort", { cohort: cohort });
  });

})



module.exports = router;
