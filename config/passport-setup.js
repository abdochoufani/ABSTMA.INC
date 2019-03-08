const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20')
const LocalStrategy=require('passport-local').Strategy
const Upcycler=require("../models/upcyclers")
const Recycler=require("../models/recyclers")
var keys = require('./keys')
var bcrypt   = require('bcrypt-nodejs');




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
    case "upcycler":
    Upcycler.findById(serializedUser.id).then((upcycler)=>{
      upcycler.userType = "upcycler"
      done(null,upcycler)
    })
    break 
  }
})





/***************************Recycler sign up and login********************************************* */

passport.use("recycler-local-signup", new LocalStrategy({usernameField: "userName",  passReqToCallback: true},
  function(req,username,password,done) {
    debugger
    Recycler.findOne({username: username }, function(err, user){
      debugger
      if (err) return done(err)
      if (user) return done(null, false, {message:'That email is already taken.'})
      else {
        var newRecycler = {
            userName:username,
            email: req.body.email,
            companyName: req.body.companyName,
            password:Recycler.generateHash(password)
          }
        Recycler.create(newRecycler, (err, newRecycler) => {
          debugger
          if (err) {
            console.log(`error occured: ${err}`);
          } else {
            debugger
            newRecycler.userType = "recycler"
            return done(null, newRecycler);
          }
        })
      }
    })
  })
)


passport.use("recycler-localLogin", new LocalStrategy({usernameField: "userName"},
  function(username, password, done) {
    debugger
    Recycler.findOne({ userName: username }, function(err,user) {
      debugger
      if (err) { return done(err)}
      if (!user) {return done(null,false)};
       if(!bcrypt.compareSync(password, user.password)){
         return done(null,false)
       }
        debugger
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

passport.use("upcycler-localSignup", new LocalStrategy({usernameField: "userName",  passReqToCallback: true},
  function(req,username,password,done) {
    Recycler.findOne({username: username }, function(err, user){
      if (err)  return done(err); 
      if (user) 
        return done(null, false, {message:'That email is already taken.'});
      else {
      var newUpcycler = {
        userName: username,
        email: req.body.email,
        companyName: req.body.companyName,
        password: Upcycler.generateHash(password)
      }    
      Upcycler.create(newUpcycler, (err,newUpcycler) => {
          if (err) {
            console.log(`error occured: ${err}`);
          } else {
            newUpcycler.userType = "upcycler"
            return done(null, newUpcycler);
          }
        })
      }
    })
  })
)

passport.use("upcycler-localLogin", new LocalStrategy({usernameField: "userName"},
    function(username, password, done) {
      Upcycler.findOne({ userName: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {return done(null,false)};
        if(!bcrypt.compareSync(password, user.password)){
          return done(null,false)
        }
         debugger
         user.userType="upcycler"
         return done(null, user);
      });
    }));


passport.use("google-up",new GoogleStrategy({
  // options for google strategy
  callbackURL:"/upcyclers/login/google/redirect",
  clientID:process.env.GOOGLE_API_CLIENT_ID,
  clientSecret:process.env.GOOGLE_API_CLIENT_SECRET
},(accessToken,refreshToken,profile,done)=>{
  debugger
      Upcycler.findOne({googleId:profile.id}).then((upcycler)=>{
        debugger
          if (upcycler){
              //user already exists then serilize passsword
              console.log("already exist")
               upcycler.userType = "upcycler"
              done(null,upcycler)
          } else {
              const imageUrl = profile.photos[0].value.replace("?sz=50", "")
          new Upcycler({
              fullName:profile.displayName,
              firstName:profile.name.givenName,
              lastName:profile.name.familyName,
              userName:profile.displayName,
              googleId:profile.id,
              imageUrl,
              gender:profile.gender
          }).save().then((newUpcycler)=>{
            debugger
              console.log("user:" + newUpcycler)
              newUpcycler.userType = "upcycler"
              done(null,newUpcycler)
          }).catch((error)=>{
            debugger
              console.log(error)
          })
      }
  })
  console.log(profile)
}))


module.exports = passport