var express = require('express');
var router = express.Router();
var passport = require("passport")




router.get("/signup",(req,res,next)=>{
    res.send('Welcome to the Signup page for Upcyclers');
})

router.get("/google/login",passport.authenticate('google',{scope: ['profile']}))

router.post("/login/google/redirect",passport.authenticate('google'),(req,res)=>{
    res.redirect("/recycler")
})


router.get("/login",passport.authenticate('recycler-localLogin'))

router.post("/login",passport.authenticate("recycler-localLogin"),(req,res)=>{
    res.redirect("/recycler")
})


module.exports = router