const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Исправленный маршрут для получения списка всех проектов
router.get('/projects', projectController.getAllProjects);

// Исправленный маршрут для получения информации о конкретном проекте
router.get('/projects/:projectId', projectController.getProjectById);

// Исправленный маршрут для создания нового проекта
router.post('/projects', projectController.createProject);

// Исправленный маршрут для обновления информации о проекте
router.put('/projects/:projectId', projectController.updateProject);

// Исправленный маршрут для удаления проекта
router.delete('/projects/:projectId', projectController.deleteProject);

module.exports = router;
