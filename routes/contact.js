var express = require('express');
var router = express.Router();

//GET Route for  => www.abstmo.com/contact
router.get('/', (req, res) => {
  res.render('home/contact');
});

module.exports = router;