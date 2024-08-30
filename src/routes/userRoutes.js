const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');
const csrf = require('csurf')({ cookie: true });
const parseForm = require('body-parser').urlencoded({ extended: false });

// Регистрация пользователя
router.get('/register', csrf, userController.showRegisterForm);
router.post('/register', parseForm, csrf, [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], userController.register);

// Вход пользователя
router.get('/login', csrf, userController.showLoginForm);
router.post('/login', parseForm, csrf, userController.login);

// Маршрут для получения информации о текущем пользователе
router.get('/me', userController.getUser);

// Главная страница
router.get('/main', userController.showMainPage);

module.exports = router;
