var express = require('express');
var router = express.Router();
var passport = require("passport")
var Upcycler = require('../../models/upcyclers');





function loggedOutUpcycler(req, res, next) {
  if (req.session && req.user.userType=="upcycler") {
    return res.redirect('/profile');
  }
  return next();
}


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

router.post('/signup', passport.authenticate("upcycler-localSignup"),(req,res)=>{
  res.redirect("/upcycler/profile")
})


router.get("/login",loggedOutUpcycler,(req,res)=>{
  res.send('Welcome to the Signup page for Upcyclers');
})

router.post("/login",passport.authenticate("upcycler-localLogin"),(req,res)=>{
  res.redirect("/upcycler")
})


router.get("/google/login", passport.authenticate('google-up',{scope: ['profile']}))

router.get("/login/google/redirect",passport.authenticate('google-up'),(req,res)=>{
  debugger
    res.redirect("/upcycler/profile")
})

module.exports = router;