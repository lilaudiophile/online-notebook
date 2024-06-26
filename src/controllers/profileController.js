// controllers/profileController.js
const User = require('../models/user');

// Контроллер для отображения профиля пользователя
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.render('profile', { user }); // Предполагается, что у вас есть шаблон profile.ejs или другой подходящий
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Контроллер для отображения формы редактирования профиля
exports.getEditProfileForm = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.render('editProfile', { user }); // Предполагается, что у вас есть шаблон editProfile.ejs или другой подходящий
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Контроллер для обновления профиля пользователя
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const { username, email, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, password },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.render('profile', { user: updatedUser }); // Перенаправление на страницу профиля после обновления
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
