var express = require('express');
var router = express.Router();




// root route
router.get('/', function(req, res, next) {
  res.render('home/index', {user:req.user});
});


//route to test chat built with socket io
router.get('/chat',(req,res)=>{
    res.render('chat/chatForm')
})








module.exports = router;
