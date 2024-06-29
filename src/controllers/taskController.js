const Task = require('../models/Task');

// Получение всех задач для пользователя
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user.id });
        res.render('tasks', { tasks });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Создание новой задачи
exports.createTask = async (req, res) => {
    const { title, description, deadline, priority } = req.body;
    try {
        const newTask = new Task({
            title,
            description,
            deadline,
            priority,
            assignedTo: req.user.id,
            createdBy: req.user.id
        });
        const task = await newTask.save();
        res.render('taskDetail', { task });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Получение задачи по ID
exports.getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        res.render('taskDetail', { task });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Обновление задачи
exports.updateTask = async (req, res) => {
    const { title, description, deadline, priority, status } = req.body;
    try {
        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, deadline, priority, status },
            { new: true }
        );
        res.render('taskDetail', { task });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Удаление задачи
exports.deleteTask = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        await Task.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Показ формы создания задачи
exports.showCreateTaskForm = (req, res) => {
    res.render('createTask');
};

// Показ формы редактирования задачи
exports.showEditTaskForm = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        res.render('editTask', { task });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
