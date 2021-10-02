const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        passwoed: {
            type: String,
            required: true
        },
        image: {
            type: String,
            default: "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", UserSchema);