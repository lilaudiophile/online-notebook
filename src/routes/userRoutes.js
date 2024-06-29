const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const projectController = require('../controllers/projectController'); // Add projectController
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const csrf = require('csurf');

// Set up CSRF protection middleware
const csrfProtection = csrf({ cookie: true });

router.get('/register', csrfProtection, userController.showRegisterForm);
router.post('/register', csrfProtection, [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], userController.register);

router.get('/login', csrfProtection, userController.showLoginForm);
router.post('/login', csrfProtection, userController.login);

router.get('/me', authMiddleware, userController.getUser);

// Project routes
router.get('/projects', authMiddleware, projectController.getProjects); // View all projects
router.post('/projects', authMiddleware, projectController.createProject); // Create a new project
router.get('/projects/new', authMiddleware, projectController.showCreateProjectForm); // Show form to create a new project
router.get('/projects/:id', authMiddleware, projectController.getProject); // View a single project
router.get('/projects/:id/edit', authMiddleware, projectController.showEditProjectForm); // Show form to edit a project
router.post('/projects/:id', authMiddleware, projectController.updateProject); // Update a project
router.delete('/projects/:id', authMiddleware, projectController.deleteProject); // Delete a project

router.get('/main', authMiddleware, userController.showMainPage); // New route for main page

module.exports = router;
