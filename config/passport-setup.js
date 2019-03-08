const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20')
const LocalStrategy=require('passport-local')
const Upcycler=require("../models/upcyclers")
const Recycler=require("../models/recyclers")
require('dotenv').config()


passport.serializeUser((user,done)=>{
  let serializedUser = {
      id: user.id,
      userType: user.userType
  }
  done(null,serializedUser)
})


passport.deserializeUser((user,done)=>{
  switch(user.userType){
    case "recycler":
      Recycler.findById(id).then((recycler)=>{
        recycler.userType = "recycler"
        done(null,recycler)
      })
      break
    case "upcyclers":
    Upcycler.findById(id).then((upcycler)=>{
      upcycler.userType = "upcycler"
      done(null,upcycler)
    })
    break 
  }
})





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
      newRecycler.local.password = newrecycler.generateHash(password)
      Upcycler.create(newUpcycler, (err) => {
          if (err) {
            console.log(`error occured: ${err}`);
          } else {
            return done(null, newUpcycler);
          }
        })
        // .then(()=>{
        //   console.log("user created", newUpcycler)
        //   })
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





passport.use(new GoogleStrategy({
  // options for google strategy
  callbackURL:"/recyclers/login/google/redirect",
  clientID:process.env.GOOGLE_API_CLIENT_ID,
  clientSecret:process.env.GOOGLE_API_CLIENT_SECRET
},(accessToken,refreshToken,profile,done)=>{
      Recycler.findOne({googleId:profile.id}).then((recycler)=>{
          if (recycler){
              //user already exists then serilize passsword
              console.log("already exist")
              newRecycler.userType = "recycler"
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



passport.use(new GoogleStrategy({
  // options for google strategy
  callbackURL:"/recyclers/login/google/redirect",
  clientID:process.env.GOOGLE_API_CLIENT_ID,
  clientSecret:process.env.GOOGLE_API_CLIENT_SECRET
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