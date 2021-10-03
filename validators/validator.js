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
        .normalizeEmail()
];
