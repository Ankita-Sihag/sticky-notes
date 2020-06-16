const User = require('../models/user');
const {validationResult} = require('express-validator/check');
const bcryptjs = require('bcryptjs');
const jsonwebtokoen = require('jsonwebtoken');

exports.postSignup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        // error.statusCode = 400;
        // error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    // console.log(email + " " + password);
    bcryptjs
    .hash(password, 12)
    .then(hashedPw => {
        const newUser = new User({email: email, password: hashedPw})
        newUser.notes = [];
        newUser.categories= [{name: 'Uncategorized'}];
        return newUser.save()
    })
    .then(result => {
        // console.log("result after saving ");
        // console.log(result);
        res.status(200).json({userId: result._id});
        // console.log("data sent");
    })
    .catch(err => {
        next(err);
    });
};

exports.postLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loginUser;
    // console.log(email +" "+password);

    User.findOne({email: email})
    .then(user => {
        if(!user)
        {
            // console.log("no user");
            const error = new Error('Invalid email or password');
            throw error;
        }
        loginUser = user;
        // console.log("user found");
        return bcryptjs.compare(password, user.password);
    })
    .then(isEqual => {
        if(!isEqual)
        {
            // console.log("password not same");
            const error = new Error('Invalid email or password');
            throw error;
        }
        const token = jsonwebtokoen.sign({
            email: loginUser.email, 
            userId: loginUser._id.toString()
        }, 'secretkeyofankitaforstickynotesapp');
        // console.log("in postlogin");
        res.status(200).json({token:token, userId: loginUser._id.toString()});
    })
    .catch(error => {
        next(error);
    });
};