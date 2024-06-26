// src/controllers/taskController.js

const Task = require('../models/Task');

// Контроллер для получения списка всех задач
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

// Контроллер для получения информации о конкретной задаче
exports.getTaskById = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve task details' });
  }
};

// Контроллер для создания новой задачи
exports.createTask = async (req, res) => {
  const { name, deadline, status, assignee, project } = req.body;
  try {
    const newTask = new Task({ name, deadline, status, assignee, project });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Контроллер для обновления информации о задаче
exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { name, deadline, status, assignee, project } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { name, deadline, status, assignee, project },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Контроллер для удаления задачи
exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};