const User = require('../models/user');

// Контроллер для обработки данных формы регистрации
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Проверка наличия пользователя с таким же email в базе данных
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    // Создание нового пользователя
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json(newUser); // Возвращаем созданного пользователя в качестве ответа
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Функция для отображения страницы регистрации
exports.getRegisterPage = (req, res) => {
  res.render('register', { csrfToken: req.csrfToken() });
};
