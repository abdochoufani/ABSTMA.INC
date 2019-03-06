var express = require('express');
var router = express.Router();
var passport = require("passport")
var Upcycler = require('../../models/upcyclers');

router.get('/', (req, res) => {
  // res.send('Welcome to the page for the Upcyclers');
  Upcycler.find({},(err, upcyclers) => {
    if (err) res.status(404).send('There seeem to be no upcycler available!');
    else res.render('allUpcyclers', {upcycler: upcyclers});
  });
});

router.get('/auth/signup', (req, res) => {
  res.send('Welcome to the Signup page for Upcyclers');
});

router.post('/auth/signup', passport.authenticate("upcycler-localSignup"),(req,res)=>{
  res.redirect("/upcycler/profile")
})

router.post("/login",passport.authenticate("upcycler-localLogin"),(req,res)=>{
  res.redirect("/upcycler")
})


router.get("/google/login",passport.authenticate('google-up',{scope: ['profile']}))

router.post("/login/google/redirect",passport.authenticate('google-up'),(req,res)=>{
    res.redirect("/upcycler/profile")
})

module.exports = router;