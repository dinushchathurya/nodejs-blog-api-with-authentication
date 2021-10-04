const express = require('express');
const router = express.Router();

const validator = require('../validators/validator');
const { AuthController } = require('../controllers');

router.post('/register', validator.createUser, AuthController.create_user);
router.post('/login', AuthController.login_user);

module.exports = router;