var express = require('express');
var router = express.Router();

//GET Route for  => www.abstmo.com/about
router.get('/', (req, res) => {
  res.render('home/about.hbs');

});


module.exports = router;