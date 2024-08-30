const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');
const csrf = require('csurf')({ cookie: true });
const parseForm = require('body-parser').urlencoded({ extended: false });

// Project routes
router.get('/', authMiddleware, projectController.getProjects);
router.post('/', parseForm, csrf, authMiddleware, projectController.createProject);
router.get('/new', csrf, authMiddleware, projectController.showCreateProjectForm);
router.get('/:id', authMiddleware, projectController.getProject);
router.get('/:id/edit', csrf, authMiddleware, projectController.showEditProjectForm);
router.post('/:id', parseForm, csrf, authMiddleware, projectController.updateProject);
router.delete('/:id', csrf, authMiddleware, projectController.deleteProject);

module.exports = router;
