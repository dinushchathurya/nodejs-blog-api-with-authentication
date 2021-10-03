const express = require('express');
const router = express.Router();

const { accessLevelVerifier } = require('../middlewares/authentication');
const { UserController } = require('../controllers');

router.put('/:id', accessLevelVerifier, UserController.update_user);
router.delete('/:id', accessLevelVerifier, UserController.delete_user);

module.exports = router;