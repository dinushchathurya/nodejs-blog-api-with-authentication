const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
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

UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

UserSchema.statics.findByEmail = function (email) {
    return new Promise((resolve, reject) => {
        return this.findOne({ email: email }).exec(function (err, user) {
            if (err) reject(err)
            resolve(user);
        });
    });
}


module.exports = mongoose.model("User", UserSchema);