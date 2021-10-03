const { check } = require('express-validator');
const User = require('../models/User');

exports.createUser = [
    check('email')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Email can not be empty!')
        .isEmail()
        .withMessage('Invalid email address!')
        .normalizeEmail(),
    check('email').custom(value => {
        return User.findByEmail(value).then(user => {
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        });
    })
];
