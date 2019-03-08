var express = require('express');
var router = express.Router();
var passport = require("passport")


function loggedOutRecycler(req, res, next) {
    if (req.session && req.user.userType=="recycler") {
      return res.redirect('/profile');
    }
    return next();
  }

/**********************************Sign up local************************************************** */

router.get("/signup",(req,res,next)=>{
    res.send('Welcome to the Signup page for recyclers');
})

router.post("/signup",(req,res,next)=> {debugger;next()},passport.authenticate("recycler-local-signup", {
    successRedirect : '/recycler/profile', // redirect to the secure profile section
    failureRedirect : '/' // redirect back to the signup page if there is an error
}))


/*******************************Login Google ******************************************************/

router.get("/google/login", passport.authenticate('google-re',{scope: ['profile']}))

router.get("/login/google/redirect",passport.authenticate('google-re'),(req,res, next)=>{
    res.redirect("/recycler/profile")
})


/***************************************Login local ***********************************************/


router.get("/login",loggedOutRecycler,(req,res)=>{
    res.send('Welcome to the Signup page for recyclers');   
})

router.post("/login",(req,res,next)=> {debugger;next()},passport.authenticate("recycler-localLogin"),(req,res)=>{
    res.redirect("/recycler/profile")
})


module.exports = router