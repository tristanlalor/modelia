const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//User model
const User = require('../models/User');
// const { deleteOne } = require('../models/User');

router.get('/login', (req, res) => res.render('login'));

router.get('/register', (req, res) => res.render('register'));

//Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({msg: "Please fill in all fields" });
    }

    //Check if passwords match
    if (password !== password2) {
        errors.push({ msg: "Passwords do not match" })
    }

    //Check password length
    if (password.length < 6) {
        errors.push({ msg: "Password should be at least 6 characters" });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        //Validation passed
        User.findOne({ email: email })
        .then(user => {
            if (user) {
                //User exists
                errors.push({ msg: "Email is already registered"})
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                //Hash password
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        //Set password to hashed
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered and can now log in')
                                res.redirect('/users/login')
                            })
                            .catch(err => console.log(err));
                }));
                console.log(newUser);
            }
        });
    }
});

//login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//DB Config
const db = require('../config/keys').MongoURI;

//add favorite
router.post('/update', (req, res, next) => {
    updateRecord(req,res);
});
const updateRecord = (req, res) => {
    User.findOne({_id:req.user.id},(err,doc)=>{
     //this will give you the document what you want to update.. then 
        if (req.body.add) {
            console.log(req.body);
            doc.favorites.push({symbol: req.body.symbol, image: req.body.image, companyName: req.body.companyName});
            doc.save(function(err,doc){
            }); 
        } else {
            //remove obj from array
            doc.favorites = doc.favorites.filter( (obj) => {
                return obj.symbol !== req.body.symbol;
            });
            doc.save(function(err,doc){
            }); 
        }
    });
}



//logout handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
});

module.exports = router;
