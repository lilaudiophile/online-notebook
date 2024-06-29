const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Project = require('../models/Project'); // Assuming you have a Board model

// Регистрация пользователя
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ username, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/main');
        });
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).send('Server error');
    }
};



// Аутентификация пользователя
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/main');
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


// Получение информации о пользователе
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.render('profile', { user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Показ формы регистрации
exports.showRegisterForm = (req, res) => {
    res.render('register', { csrfToken: req.csrfToken() });
};

// Показ формы логина
exports.showLoginForm = (req, res) => {
    res.render('login', { csrfToken: req.csrfToken() });
};

// Показ основной страницы
exports.showMainPage = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const projects = await Project.find({ user: req.user.id });

        res.render('main', { user, projects, token: req.cookies.token });
    } catch (error) {
        console.error('Error fetching user or projects:', error.message);
        res.status(500).send('Server error');
    }
};
