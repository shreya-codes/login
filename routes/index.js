const express=require('express');
const router= express.Router();// creates a new router object to handle requests
const { ensureAuthenticated }= require('../config/auth');

//welcome page
router.get('/',(req,res)=> res.render('Welcome'));
//dashboard
router.get('/dashboard',ensureAuthenticated ,(req,res)=>
res.render('dashboard',{
    name:req.user.name
}));
module.exports=router; //Module exports are the instruction that tells Node. js which bits of code (functions, objects, strings, etc.) to “export” from a given file so other files are allowed to access the exported code
