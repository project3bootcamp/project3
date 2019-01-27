const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');
//defines the register route
router.post('/register', function(req, res) {
    //checks validation for all inputs
    //if errors exist sends error response to the client
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    //checks if email already exists 
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        //fetchs avatar based on email address 
        else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });
            //creates hash value of the password and saves the user in the database
            //sends back user to the client
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                }); 
                        }
                    });
                }
            });
        }
    });
});

router.post('/update', (req,res) => {
    console.log(req.body)
    const id = req.body.id;
    const savesearches = {
        actor1: req.body.actor1,
        actor2: req.body.actor2
    }
   // console.log(req)
        User
          .findOneAndUpdate({ _id: id },{$addToSet: {search: [savesearches] }})
          .then(dbModel => res.json(dbModel))
          .catch(err => {
            console.log(err);
            res.status(422).json(err)
          })
});
//defines the login route
router.post('/login', (req, res) => {
    //checks validation for all inputs
    //if errors exist sends error response to the client
    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    //checks email if not found sends error back to client saying user not found
    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            //if the user is correct bcrypt checks password with compare method
            //if match it will generate a jwt token
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        //user object as a payload that gives a secret key to make a JWT token
                        //sends back token to user 
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                name: user.name,
                                avatar: user.avatar
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`
                                    });
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    });
        });
});

router.get('/:id',(req,res) => {
    User.findById({ _id: req.params.id })
    .then(dbModel => res.json(dbModel))
          .catch(err => {
            console.log(err);
            res.status(422).json(err)
          })
});
//if no jwt user will be redirected back to log in because of the protected route
router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });

});

module.exports = router;