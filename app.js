require('dotenv').config(); // Load environment variables

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

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CSRF protection middleware
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Set view engine
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// MongoDB connection
mongoose.connect('mongodb://localhost/online_notebook');
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Import controllers
const userController = require('./src/controllers/userController');
const taskController = require('./src/controllers/taskController');
const projectController = require('./src/controllers/projectController');
const commentController = require('./src/controllers/commentController');

// Import middleware
const authMiddleware = require('./src/middleware/authMiddleware');




// Import routers
const userRoutes = require('./src/routes/userRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const commentRoutes = require('./src/routes/commentRoutes');

// Use routers
app.use('/user', userRoutes);
app.use('/task', taskRoutes);
app.use('/project', projectRoutes);
app.use('/comment', commentRoutes);

// Root route
app.get('/', (req, res) => {
  res.render('index');
});

app.use(authMiddleware);

// User routes
app.get('/register', csrfProtection, userController.showRegisterForm);
app.post('/register', csrfProtection, userController.register);
app.get('/login', csrfProtection, userController.showLoginForm);
app.post('/login', csrfProtection, userController.login);
app.get('/me', authMiddleware, userController.getUser);
app.get('/main', authMiddleware, userController.showMainPage);

// Project routes
app.get('/projects', authMiddleware, projectController.getProjects);
app.post('/projects', authMiddleware, csrfProtection, projectController.createProject);
app.get('/projects/new', authMiddleware, csrfProtection, projectController.showCreateProjectForm);
app.get('/projects/:id', authMiddleware, projectController.getProject);
app.get('/projects/:id/edit', authMiddleware, csrfProtection, projectController.showEditProjectForm);
app.post('/projects/:id', authMiddleware, csrfProtection, projectController.updateProject);
app.delete('/projects/:id', authMiddleware, csrfProtection, projectController.deleteProject);

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
