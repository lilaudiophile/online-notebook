const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Исправленный маршрут для получения списка всех задач
router.get('/tasks', taskController.getAllTasks);

// Исправленный маршрут для получения информации о конкретной задаче
router.get('/tasks/:taskId', taskController.getTaskById);

// Исправленный маршрут для создания новой задачи
router.post('/tasks', taskController.createTask);

// Исправленный маршрут для обновления информации о задаче
router.put('/tasks/:taskId', taskController.updateTask);

// Исправленный маршрут для удаления задачи
router.delete('/tasks/:taskId', taskController.deleteTask);

module.exports = router;

// скрыть задачу поставить статус задачи