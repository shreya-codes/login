const express = require('express'); //require is a built-in function to include external modules that exist in seperate files
const expressLayouts= require('express-ejs-layouts');
const mongoose=require('mongoose');

const app=express(); //creates a new express application

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
//Routes
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/user'))
const PORT= process.env.PORT || 5000;
app.listen(PORT,console.log(`Server started on port ${PORT}`));

