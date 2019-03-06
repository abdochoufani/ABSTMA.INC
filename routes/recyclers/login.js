var express = require('express');
var router = express.Router();
var passport = require("passport")
const Recycler = require('../../models/recyclers');
const Product=require('../../models/products')



router.get("/signup",(req,res,next)=>{
    res.send('Welcome to the Signup page for recyclers');
})

router.post("/signup",passport.authenticate("recycler-localSignup",(req,res)=>{
    res.redirect("/recycler/profile")
}))

router.get("/google/login",passport.authenticate('google-re',{scope: ['profile']}))

router.get("/login/google/redirect",passport.authenticate('google-re'),(req,res, next)=>{
    res.redirect("/recycler/profile")
})


router.get("/login",(req,res)=>{
    res.send('Welcome to the Signup page for recyclers');   
})

router.post("/login",passport.authenticate("recycler-localLogin"),(req,res)=>{
    res.redirect("/recycler/profile",{recycler:req.user})
})


module.exports = router