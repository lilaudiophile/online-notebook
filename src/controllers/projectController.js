// src/controllers/projectController.js

const Project = require('../models/Project');

// Контроллер для получения списка всех проектов
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve projects' });
  }
};

// Контроллер для получения информации о конкретном проекте
exports.getProjectById = async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve project details' });
  }
};

// Контроллер для создания нового проекта
exports.createProject = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newProject = new Project({ name, description });
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
};

// Контроллер для обновления информации о проекте
exports.updateProject = async (req, res) => {
  const { projectId } = req.params;
  const { name, description } = req.body;
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { name, description },
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

// Контроллер для удаления проекта
exports.deleteProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const deletedProject = await Project.findByIdAndDelete(projectId);
    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(deletedProject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};
