var express = require('express');
var router = express.Router();
<<<<<<< HEAD
var mongoose=require("mongoose")
=======
>>>>>>> 98b85f158b20501ad9a593d581601cd351b725f8




// root route
router.get('/', function(req, res, next) {
  debugger
  res.render('home/index', {user:req.user});
});


//route to test chat built with socket io
router.get('/chat',(req,res)=>{
    res.render('chat/chatForm')
})




router.get("/logout",(req,res)=>{
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
})

module.exports = router;
