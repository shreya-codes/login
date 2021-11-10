const express = require('express'); //require is a built-in function to include external modules that exist in seperate files
const expressLayouts= require('express-ejs-layouts');
const mongoose=require('mongoose');
const flash=require('connect-flash');
const session=require('express-session');
const passport = require('passport');

const app=express(); //creates a new express application
//passport config
require('./config/passport')(passport);
//DB config
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db,{useNewUrlParser:true})
.then(()=>console.log("mongoDB connected"))
.catch(err=>console.log(err));
//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//Bodyparser
app.use(express.urlencoded({extended:false}));

// Express session
app.use(
    session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
  );
  //passport middleware
  app.use(passport.initialize());
app.use(passport.session());
  //Connect flash
  app.use(flash());
  //global vars
  app.use(function(req,res,next){ //ADDING OUR OWN MIDDLEWARE 
      res.locals.success_msg = req.flash('success_msg');     ///setting global variables.. herre the variable is sucess_msg
      res.locals.error_msg = req.flash('error_msg'); 
      res.locals.error = req.flash('error'); 
      next();
  })
//Routes
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/user'))
const PORT= process.env.PORT || 5000;
app.listen(PORT,console.log(`Server started on port ${PORT}`));

