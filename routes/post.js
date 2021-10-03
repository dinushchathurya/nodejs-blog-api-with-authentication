const express = require('express');
const router = express.Router();

const { authenticationVerifier } = require('../middlewares/authentication');
const { PostController } = require('../controllers');

router.get('/',PostController.get_posts);
router.get('/:id', PostController.get_post);
router.post('/', authenticationVerifier,PostController.create_post);
router.put('/:id', authenticationVerifier,PostController.update_post);
router.delete('/:id', authenticationVerifier, PostController.delete_post);

module.exports = router;