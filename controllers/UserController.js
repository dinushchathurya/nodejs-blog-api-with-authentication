const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const UserController = {

    /* update user */
    async update_user(req, res) {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body },{ new: true });
            res.status(200).json({
                type: "success",
                message: "User updated successfully",
                updatedUser
            })
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },
};

module.exports = UserController;