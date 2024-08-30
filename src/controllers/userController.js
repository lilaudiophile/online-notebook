const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// Отображение формы регистрации
exports.showRegisterForm = (req, res) => {
    res.render('register', { csrfToken: req.csrfToken() });
};

// Обработка регистрации пользователя
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Пользователь уже существует' });
        }

        user = new User({ username, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                return res.status(500).json({ msg: 'Ошибка сервера' });
            }
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/main');
        });
    } catch (err) {
        res.status(500).json({ msg: 'Ошибка сервера' });
    }
};

// Отображение формы входа
exports.showLoginForm = (req, res) => {
    res.render('login', { csrfToken: req.csrfToken() });
};

// Обработка входа пользователя
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Неверные данные для входа' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Неверные данные для входа' });
        }

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                return res.status(500).json({ msg: 'Ошибка сервера' });
            }
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/main');
        });
    } catch (err) {
        res.status(500).json({ msg: 'Ошибка сервера' });
    }
};

// Получение данных текущего пользователя
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.render('profile', { user });
    } catch (err) {
        res.status(500).json({ msg: 'Ошибка сервера' });
    }
};

// Отображение главной страницы
exports.showMainPage = (req, res) => {
    res.render('main');
};
