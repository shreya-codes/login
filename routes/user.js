const express=require('express');
const router= express.Router();// creates a new router object to handle requests
const bcrypt=require('bcryptjs');
const passport=require('passport');
//User model
const User = require('../models/User'); // now we can use methods on user



//LOGIN page
// router.get('/login',(req,res)=> res.send('Login'));
router.get('/login',(req,res)=> res.render('Login'));

//Register
// router.get('/register',(req,res)=> res.send('Register'));
 router.get('/register',(req,res)=> res.render('Register'));

 //Register handle 
 router.post('/register',(req ,res )=>{
    //  console.log(req.body );
    //  res.send('Hello');
    const { name , email , password, password2}= req.body;
    let errors=[];
     // check required fields 
    if (!name || !email || !password || !password2){
        errors.push({msg:  ' please fill in all the fields'});
    }
    // check password match
    if (password !== password2){
        errors.push({msg:'passwords do not match'});

    }
    // check password length
    if(password.length<6){
        errors.push({msg:'password should be atleast 6 characters' });
    }
    if (errors.length >0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
             
        })

    }
    else{
        // res.send('pass');
        //Validation 
        User.findOne({email:email})
        .then(user =>{
            if(user){
                // user exists
                errors.push({msg:'Email is already registered'});
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                     
                })

            }
            else{
                const newUser = new User({
                    name,
                    email,
                    password
                });
           
                //Hash password
                bcrypt.genSalt(10,(err,salt)=>
                 bcrypt.hash(newUser.password,salt,(err,hash)=>{
                     if(err) throw err;
                     //set password to hashed
                     newUser.password=hash;
                     //Save user
                     newUser.save()
                     .then(user=>{
                         req.flash('success_msg', 'You are nw registered !')
                        //  res.redirect('/users/login');
                     })
                     .catch(err => console.log(err));
                }))
                
            }


        });
       



    }
    

 });
 //Login handle
 router.post('/login',(req,res,next)=>{
     passport.authenticate('local',{
         successRedirect:'/dashboard',
         failureRedirect:'/users/login',
         failureFlash:true
     })(req,res,next);

 })
 //logout handle
 router.get('/logout',(req,res)=>{
     req.logout();
     req.flash('success_msg','You are loggedout');
     res.redirect('/users/login');
 })

module.exports=router; //Module exports are the instruction that tells Node. js which bits of code (functions, objects, strings, etc.) to “export” from a given file so other files are allowed to access the exported code
