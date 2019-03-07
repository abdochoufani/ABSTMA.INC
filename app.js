var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose=require('mongoose');
var keys = require('./config/keys');
var indexRouter = require('./routes/index');
var passport=require("passport")
var session = require('express-session')
 require('./config/passport-setup')


mongoose.connect('mongodb://localhost/abstma', {useNewUrlParser: true})
.then((db) => {console.log('MongodDB Connectet to ABSTMA Database')
})
.catch(err => console.log(`An error was encountered, details: ${err}`));

var app = express();
var recyclersLogin=require("./routes/recyclers/login")
var userRouter = require('./routes/recyclers/user');
var upcyclersLogin = require('./routes/upcyclers/login');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var upcyclerRouter = require('./routes/upcyclers/user');
var productRouter = require('./routes/products');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: keys.session.cookieKey,
  resave: true,
  saveUninitialized: true,
}))



app.use((req,res,next)=>{
  debugger
  if(req.session.passport){
    if(req.session.passport.user.userType =="recycler") res.locals.recycler = req.session.id
    else if(req.session.passport.user.userType=="upcycler") res.locals.user = req.session.id
  }
  next()
})


app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/recycler', require('./routes/recyclers/user'));
app.use('/recyclers',require("./routes/recyclers/login"))
app.use('/upcyclers', upcyclersLogin);
app.use('/upcycler', upcyclerRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/products', productRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connect('mongodb://localhost/abstma', {useNewUrlParser: true})
.then((db) => {console.log('MongodDB Connectet to ABSTMA Database')
})
.catch(err => console.log(`An error was encountered, details: ${err}`));

module.exports = app;
