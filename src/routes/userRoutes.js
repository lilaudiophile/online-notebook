const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Маршрут для получения списка всех пользователей
router.get('/users', userController.getAllUsers);

// Маршрут для получения информации о конкретном пользователе
router.get('/users/:userId', userController.getUserById);

// Маршрут для создания нового пользователя
router.post('/users', userController.createUser);

// Маршрут для обновления информации о пользователе
router.put('/users/:userId', userController.updateUser);

// Маршрут для удаления пользователя
router.delete('/users/:userId', userController.deleteUser);

module.exports = router;
