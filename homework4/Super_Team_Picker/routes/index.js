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
  const opt = req.query.method1;
  const qty = parseInt(req.query.quantity);
  
  knex
  .select("*")
  .from("cohorts")
  .where({ id: req.params.id }) 
  .then(results => {
    const [cohort] = results;

    let members_arr  = cohort.members.split(',').map(x => x.trim());

    // console.log(members_arr);

    let j = Math.floor(Math.random() * members_arr.length);
    for (let i = 0; i < members_arr.length; i++) {
          temp = members_arr[i];
          members_arr[i] = members_arr[j];
          members_arr[j] = temp;
      }
    // console.log(members_arr);

    
    let new_team = [];
    let new_length = 0;

    if (opt === "2"){
        while(members_arr.length) {new_team.push(members_arr.splice(0,qty))}
    } else {
        let new_length = Math.ceil(members_arr.length / qty)
        // console.log(new_length)
        // console.log(qty)
        // console.log(members_arr.length)
        // console.log(members_arr)
        for(let j= 0; j < members_arr.length; j+=new_length){
          console.log(j);
          new_team.push(members_arr.slice(j, j + new_length));
        }
        // while(new_length <= members_arr.length) { new_team.push(members_arr.splice(0,new_length)) }
    }

    // res.send(cohort);
    res.render("cohort", {cohort,new_team, qty, opt});
    // console.log(cohort, new_team, opt, qty);
  });
})



module.exports = router;
