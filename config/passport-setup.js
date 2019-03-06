const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20')
const LocalStrategy=require('passport-local')
const Upcycler=require("../models/upcyclers")
const Recycler=require("../models/recyclers")
var keys = require('./keys')


passport.serializeUser((user,done)=>{
  let serializedUser = {
      id: user.id,
      userType: user.userType
  }
  debugger
  done(null,serializedUser)
})


passport.deserializeUser((serializedUser,done)=>{
  debugger
  switch(serializedUser.userType){
    case "recycler":
      Recycler.findById(serializedUser.id).then((recycler)=>{
        debugger
        recycler.userType = "recycler"
        done(null,recycler)
      })
      break
    case "upcyclers":
    Upcycler.findById(serializedUser.id).then((upcycler)=>{
      upcycler.userType = "upcycler"
      done(null,upcycler)
    })
    break 
  }
})



passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});





passport.use("upcycler-localSignup", new LocalStrategy(
  function(username,password,done) {
    Upcycler.findOne({username: username }, function(err, user){
      if (err) { return done(err); }
      if (user) {
        return done(null, false, {message:'That email is already taken.'});
    } else {
      var newUpcycler = {
        userName: req.body.userName,
        email: req.body.email,
        companyName: req.body.companyName,
      }
      newUpcycler.local.password = newUpcycler.generateHash(password)
      Upcycler.create(newUpcycler, (err) => {
          if (err) {
            console.log(`error occured: ${err}`);
          } else {
            res.redirect('/upcycler/profile');
          }
        }).then(()=>{
          console.log("user created", newUpcycler)
          return done(null, newUpcycler);
          })
      }
    })
  })
)


/***************************Recycler sign up and login********************************************* */

passport.use("recycler-localSignup", new LocalStrategy(
  function(username,password,done) {
    Recycler.findOne({username: username }, function(err, user){
      if (err) { return done(err); }
      if (user) {
        return done(null, false, {message:'That email is already taken.'});
    } else {
      var newRecycler = {
        userName: req.body.userName,
        email: req.body.email,
        companyName: req.body.companyName,
      }
      Recycler.create(newRecycler, (err) => {
          if (err) {
            console.log(`error occured: ${err}`);
          } else {
            newRecycler.local.password = newRecycler.generateHash(password)
            newRecycler.userType = "recycler"
            return done(null, newRecycler);
          }
        })
      }
    })
  })
)


passport.use("recycler-localLogin", new LocalStrategy(
  function(username, password, done) {
    Upcycler.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      user.userType="recycler"
      return done(null, user);
    });
  }
));


passport.use("google-re",new GoogleStrategy({
  // options for google strategy
  callbackURL:"/recyclers/login/google/redirect",
  clientID:keys.google.clientID,
  clientSecret:keys.google.clientSecret
},(accessToken,refreshToken,profile,done)=>{
      debugger
      Recycler.findOne({googleId:profile.id}).then((recycler)=>{
        debugger
          if (recycler){
              //user already exists then serilize passsword
              console.log("already exist")
              recycler.userType = "recycler"
              done(null,recycler)
          } else {
              const imageUrl = profile.photos[0].value.replace("?sz=50", "")
          new Recycler({
              fullName:profile.displayName,
              firstName:profile.name.givenName,
              lastName:profile.name.familyName,
              userName:profile.displayName,
              googleId:profile.id,
              imageUrl,
              gender:profile.gender
          }).save().then((newRecycler)=>{
              console.log("user:" + newRecycler)
              newRecycler.userType = "recycler"
              done(null,newRecycler)
          }).catch(()=>{
              console.log("error")
          })
      }
  })
  console.log(profile)
}))



/***************************Upcycler sign up and login********************************************* */

passport.use("upcycler-localSignup", new LocalStrategy(
  function(username,password,done) {
    Recycler.findOne({username: username }, function(err, user){
      if (err) { return done(err); }
      if (user) {
        return done(null, false, {message:'That email is already taken.'});
    } else {
      var newUpcycler = {
        userName: req.body.userName,
        email: req.body.email,
        companyName: req.body.companyName,
      }    
      Upcycler.create(newUpcycler, (err) => {
          if (err) {
            console.log(`error occured: ${err}`);
          } else {
            newUpcycler.local.password = newUpcycler.generateHash(password)
            newUpcycler.userType = "upcycler"
            return done(null, newUpcycler);
          }
        })
      }
    })
  })
)

passport.use("upcycler-localLogin", new LocalStrategy(
    function(username, password, done) {
      Upcycler.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user || !user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect username or password' });
        } else {
        user.userType="upcycler"
        return done(null, user);
        }
      });
    }
  ));






passport.use("google-up",new GoogleStrategy({
  // options for google strategy
  callbackURL:"/upcyclers/login/google/redirect",
  clientID:keys.google.clientID,
  clientSecret:keys.google.clientSecret
},(accessToken,refreshToken,profile,done)=>{
      Upcycler.findOne({googleId:profile.id}).then((upcycler)=>{
          if (upcycler){
              //user already exists then serilize passsword
              console.log("already exist")
              // newUpcycler.userType = "upcycler"
              done(null,upcycler)
          } else {
              const imageUrl = profile.photos[0].value.replace("?sz=50", "")
          new Recycler({
              fullName:profile.displayName,
              firstName:profile.name.givenName,
              lastName:profile.name.familyName,
              userName:profile.displayName,
              googleId:profile.id,
              imageUrl,
              gender:profile.gender
          }).save().then((newUpcycler)=>{
              console.log("user:" + newUpcycler)
              newUpcycler.userType = "upcycler"
              done(null,newUpcycler)
          }).catch(()=>{
              console.log("error")
          })
      }
  })
  console.log(profile)
}))


module.exports = passport