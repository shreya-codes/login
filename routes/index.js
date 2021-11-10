const express=require('express');
const router= express.Router();// creates a new router object to handle requests
//welcome page
router.get('/',(req,res)=> res.render('Welcome'));
//dashboard
router.get('/dashboard',(req,res)=>res.render('dashboard'));
module.exports=router; //Module exports are the instruction that tells Node. js which bits of code (functions, objects, strings, etc.) to “export” from a given file so other files are allowed to access the exported code
