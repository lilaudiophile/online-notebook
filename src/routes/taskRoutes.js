const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, taskController.getTasks);
router.get('/create', authMiddleware, taskController.showCreateTaskForm);
router.post('/create', authMiddleware, taskController.createTask);
router.get('/:id', authMiddleware, taskController.getTask);
router.get('/:id/edit', authMiddleware, taskController.showEditTaskForm);
router.post('/:id/edit', authMiddleware, taskController.updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
