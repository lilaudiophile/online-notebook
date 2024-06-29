const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, projectController.getProjects);
router.get('/create', authMiddleware, projectController.showCreateProjectForm);
router.post('/create', authMiddleware, projectController.createProject);
router.get('/:id', authMiddleware, projectController.getProject);
router.get('/:id/edit', authMiddleware, projectController.showEditProjectForm);
router.post('/:id/edit', authMiddleware, projectController.updateProject);
router.delete('/:id', authMiddleware, projectController.deleteProject);

module.exports = router;
