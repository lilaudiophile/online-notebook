// src/models/User.js

//Имя (Name): Строка, представляющая имя пользователя.
//Электронная почта (Email): Строка, уникальная для каждого пользователя.
//Пароль (Password): Хешированный пароль пользователя.
//Роль (Role): Строка, представляющая роль пользователя (обычный пользователь, менеджер, администратор и т.д.).

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user', // значение по умолчанию
  }
});

// Метод для хеширования пароля перед сохранением
userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    return next();
  }
});

// Метод для проверки пароля
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;