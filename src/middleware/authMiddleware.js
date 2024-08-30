const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Функция обновления токена
async function refreshToken(token, res, next) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
        const user = await User.findById(decoded.user.id);
        if (!user) {
            throw new Error('User not found');
        }

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, newToken) => {
            if (err) {
                return res.status(500).json({ msg: 'Server error' });
            }
            res.cookie('token', newToken, { httpOnly: true });
            next();
        });
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

module.exports = async (req, res, next) => {
    const token = req.cookies.token || req.header('x-auth-token') || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user.id);
        if (!user) {
            return res.status(401).json({ msg: 'Token is not valid' });
        }

        req.user = decoded.user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            refreshToken(token, res, next);
        } else {
            res.status(401).json({ msg: 'Token is not valid' });
        }
    }
};
