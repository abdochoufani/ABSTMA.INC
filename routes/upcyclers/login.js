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

router.get('/signup', (req, res) => {
  res.send('Welcome to the Signup page for Upcyclers');
});

router.post('/signup', passport.authenticate("recycler-localSignup"),(req,res)=>{
  res.redirect("/upcycler/profile")
})


router.get("/login",(req,res)=>{
  res.send('Welcome to the Signup page for Upcyclers');
})

router.post("/login",passport.authenticate("upcycler-localLogin"),(req,res)=>{
  res.redirect("/upcycler")
})


router.get("/google/login",(req,res,next)=> {debugger;next()}, passport.authenticate('google-up',{scope: ['profile']}))

router.get("/login/google/redirect",passport.authenticate('google-up'),(req,res)=>{
  debugger
    res.redirect("/upcycler/profile")
})

module.exports = router;