const { check } = require('express-validator');
const User = require('../models/User');

exports.createUser = [
    check('username')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Username can not be empty!')
        .custom(value => {
            return User.findByUsername(value).then(user => {
                if (user) {
                    return Promise.reject('Username already exists');
                }
            })
        }),
    check('email')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Email can not be empty!')
        .isEmail()
        .withMessage('Invalid email address!')
        .normalizeEmail()
        .custom(value => {
            return User.findByEmail(value).then(user => {
                if (user) {
                    return Promise.reject('E-mail already exists');
                }
            })
        }),
    check('password')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Password can not be empty!')
];
