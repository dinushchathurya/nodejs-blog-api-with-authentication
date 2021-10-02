const { validationResult } = require('express-validator');

const User = require('../models/User');

const AuthController = {
    
    /* create new user */
    async create_user(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({
                type: 'error',
                message: errors.array()
            });
        } else {
            try {
                const { username, email, password } = req.body; 
                const newUser = new User({
                    username: username,
                    email: email,
                    password: password
                });

                const user = await newUser.save();
                res.status(201).json({
                    type: 'success',
                    message: "User has been created successfuly",
                    data: user
                });

            } catch (err) {
                res.status(500).json({
                    type: 'error',
                    message: err
                });
            }    
        }
    }
};

module.exports = AuthController;