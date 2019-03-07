var express = require('express');
var router = express.Router();
var mongoose=require("mongoose")




// root route
router.get('/', function(req, res, next) {
  debugger
  res.render('home/index', {user:req.user});
});


//route to test chat built with socket io
router.get('/chat',(req,res)=>{
    res.render('chat/chatForm')
})

module.exports = router;
