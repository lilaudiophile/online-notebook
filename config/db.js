// db.js
const mongoose = require('mongoose');
const User = require('./models/User');
const Task = require('./models/Task');
const Project = require('./models/Project');

mongoose.connect('mongodb://localhost/db', { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = { User, Task, Project };

