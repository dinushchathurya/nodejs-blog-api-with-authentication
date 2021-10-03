const jwt = require('jsonwebtoken')

const api_config = require("../config/api.js");

const authenticationVerifier = (req, res, next) => {

    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, api_config.api.jwt_secret, (err, user) => {
            if (err) {
                res.status(403).json({
                    type: "error",
                    message: ("Invalid token")
                });
                return;
            }
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json("You are not authenticated and you need to log in!");
    }
}

/* check if the current user */
const accessLevelVerifier = (req, res, next) => {
    authenticationVerifier(req, res, () => {
        if (req.user.id === req.params.id) {
            next()
        } else {
            res.status(403).json("You are not allowed to perform this task");
        }
    })
}

module.exports = { authenticationVerifier, accessLevelVerifier };