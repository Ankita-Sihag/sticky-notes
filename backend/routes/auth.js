const express = require('express');
const authController = require('../controllers/auth');
const User = require('../models/user');
const {body} = require('express-validator/check');

const router = express.Router();

router.post('/signup', [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
            if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
            }
        });
    }),
    body('password')
    .trim()
    .isLength({ min: 2 })
    .withMessage("Password length min 2 characters"),
], authController.postSignup);

router.post('/login', authController.postLogin);

module.exports = router;