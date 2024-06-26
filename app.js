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


// Создание экземпляра приложения Express
const app = express();
const PORT = process.env.PORT || 3000;

// Устанавливаем путь к директории с представлениями
app.set('views', path.join(__dirname, 'src', 'views'));


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



const csurf = require('csurf');
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(csurf());

app.use(passport.initialize());
app.use(passport.session());


// Routes
// В этом месте вы будете добавлять ваши маршруты API


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

app.get('/', (req, res) => {
  res.send('Hello, this is your backend server!');
});

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});