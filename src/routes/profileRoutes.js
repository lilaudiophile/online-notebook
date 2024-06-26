// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Маршрут для отображения профиля пользователя
router.get('/profile/:userId', profileController.getUserProfile);

// Маршрут для отображения формы редактирования профиля
router.get('/profile/:userId/edit', profileController.getEditProfileForm);

// Маршрут для обновления профиля пользователя
router.post('/profile/:userId/edit', profileController.updateUserProfile);

module.exports = router;
