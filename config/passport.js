const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('moongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/User');

module.exports = function (passport){ // passing the passport from app.js file
    passport.use(
        new LocalStrategy({usernameField: 'email'},
        (email,password,done)=>{
            //Match user
            User.findOne({email:email})
            .then(user =>{
                if(!user){
                    return done(null,false,{message:'The email is not registered'})
                }
                //match password
                bcrypt.compare(password,user.password,(err,isMatch)=>{ //user.password is from the database and is hashed
                    if(err) throw err;
                    if (isMatch){
                        return done(null,user)
                    }
                    else
                    return done(null, false,{message:'Password Incorrect'});

                }) 
            })
            .catch(err=>console.log(err));

        })
    )
}