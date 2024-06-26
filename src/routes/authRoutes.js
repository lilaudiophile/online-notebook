// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Маршрут для страницы регистрации (GET запрос)
router.get('/register', authController.getRegisterPage);

// Маршрут для обработки данных формы регистрации (POST запрос)
router.post('/register', authController.registerUser); // Добавлен этот маршрут

module.exports = router;

