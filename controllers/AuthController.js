const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

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
    },

    /* user login */
    async login_user(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                type: 'error',
                message: errors.array()
            });
        } else { 
            try {
                const { username } = req.body;
                const user = await User.findOne({ username: username });
                if (!user) {
                    return res.status(401).json({
                        type: 'error',
                        message: 'No account is associated with the given username'
                    });
                }

                const isMatch = await bcrypt.compare(req.body.password, user.password);
                if (!isMatch) {
                    return res.status(401).json({
                        type: 'error',
                        message: 'Invalid credentials'
                    });
                }

                const { password, ...data } = user._doc;
                res.status(200).json({
                    type: 'sucesss',
                    data
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