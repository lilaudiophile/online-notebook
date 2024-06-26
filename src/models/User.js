// src/models/User.js

//Имя (Name): Строка, представляющая имя пользователя.
//Электронная почта (Email): Строка, уникальная для каждого пользователя.
//Пароль (Password): Хешированный пароль пользователя.
//Роль (Role): Строка, представляющая роль пользователя (обычный пользователь, менеджер, администратор и т.д.).

const mongoose = require('mongoose');

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
});

const User = mongoose.model('User', userSchema);

module.exports = User;
