const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/:id/comment', authMiddleware, commentController.showAddCommentForm);
router.post('/:id/comment', authMiddleware, commentController.addComment);

module.exports = router;
