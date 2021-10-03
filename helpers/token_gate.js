const jwt = require('jsonwebtoken');
const api_config = require("../config/api")

function encode_registration_token(user_id) {
    const info = { id: user_id };
    const token = jwt.sign(info, api_config.api.jwt_secret,{
        expiresIn: "1d"
    });
    return token;
}

module.exports = {
    encode_registration_token
};