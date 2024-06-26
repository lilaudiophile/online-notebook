// app.js

// Подключение необходимых модулей
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const expressValidator = require('express-validator');
const path = require('path');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

// Импорт контроллеров
const authController = require('./src/controllers/authController');
const profileController = require('./src/controllers/profileController');
const projectController = require('./src/controllers/projectController');
const taskController = require('./src/controllers/taskController');
const userController = require('./src/controllers/userController');


// Создание экземпляра приложения Express
const app = express();
const PORT = process.env.PORT || 3000;

// Устанавливаем путь к директории с представлениями
app.set('views', path.join(__dirname, 'src', 'views'));

// Use cookie parser middleware
app.use(cookieParser());

// Устанавливаем EJS как шаблонизатор
app.set('view engine', 'ejs');

// Указываем путь к модели пользователя
const User = require('./src/models/user');

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://localhost/online_notebook', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Используем body-parser для обработки данных формы
// Это позволит Express обрабатывать данные формы, отправленные методом POST, также как и JSON данные.

// Использование express-validator как объект
const { body, validationResult } = require('express-validator');
app.use(
  expressValidator({
    customValidators: {
      // Ваши пользовательские валидаторы, если есть
    }
  })
);



// Set up CSRF protection middleware
const csrfProtection = csrf({ cookie: true });

// Apply CSRF protection middleware to routes that need it
app.use(csrfProtection);

// Routes
// Подключаем маршруты

const authRoutes = require('./src/routes/authRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

// Используем подключенные маршруты
app.use('/', authRoutes);
app.use('/', profileRoutes);
app.use('/', projectRoutes);
app.use('/', taskRoutes);


app.get('/register', csrfProtection, authController.getRegisterPage);
app.post('/register', authController.registerUser);

app.get('/profile/:userId', csrfProtection, profileController.getUserProfile);
app.post('/profile/:userId', profileController.updateUserProfile);

// Тестовый маршрут
app.get('/', (req, res) => {
  res.send('Hello, this is your backend server!');
});

// Обработка ошибок CSRF
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).json({ error: 'Invalid CSRF token' });
  } else {
    next(err);
  }
});

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});