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

router.get('/auth/signup', (req, res) => {
  res.send('Welcome to the Signup page for Upcyclers');
});

router.post('/auth/signup', passport.authenticate("upcycler-localSignup"),(req,res)=>{
  res.redirect("/upcycler/profile")
})

router.post("/login",passport.authenticate("upcycler-localLogin"),(req,res)=>{
  res.redirect("/upcycler")
})


router.get("/google/login",passport.authenticate('google',{scope: ['profile']}))

router.post("/login/google/redirect",passport.authenticate('google'),(req,res)=>{
    res.redirect("/upcycler/profile")
})


//   Upcycler.findOne({ email: req.body.email }, function(err, user) {
//     if(err) {
//        console.log("error",err)
//     }
//     if (user) {
//           var err = new Error('A user with that email has already registered. Please use a different email..')
//          err.status = 400;
//          return next(err);
//     } else {
//         var newUpcycler = {
//           userName: req.body.userName,
//           email: req.body.email,
//           companyName: req.body.companyName,
//         }
//         bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
//           // Store hash in your password DB
//           newUpcycler.password = hash;
//           Upcycler.create(newUpcycler, (err) => {
//             if (err) {
//               console.log(`error occured: ${err}`);
//             } else {
//               req.session.userId= user._id
//               res.redirect('/upcycler/profile');
//             }
//           }).then(()=>{
//             console.log("user created", newUpcycler)
//           })
//         }
//       )
//     }
//  })
// })







  // router.post('/login/recycler', 
  // upcyclerPassport.authenticate('recycler-local', { failureRedirect: '/' }),
  // function(req, res) {
  //   res.redirect('/upcycler/profile');
  // });




module.exports = router;