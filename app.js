require('dotenv').config(); // Load environment variables

console.log('JWT_SECRET:', process.env.JWT_SECRET);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/';

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');


// CSRF protection middleware
const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });

// Import middleware
const authMiddleware = require('./src/middleware/authMiddleware');

// Import routers
const userRoutes = require('./src/routes/userRoutes');
const projectRoutes = require('./src/routes/projectRoutes');

// Root route
app.get('/', csrfProtection, (req, res) => {
  res.render('index', { csrfToken: req.csrfToken() });
});

// Register and login routes
app.use('/api/users', userRoutes);
app.use('/projects', projectRoutes);

// Error handling
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    console.error('Invalid CSRF token:', err);
    res.status(403).json({ error: 'Invalid CSRF token' });
  } else {
    next(err);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
