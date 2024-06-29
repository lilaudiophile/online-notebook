const Project = require('../models/Project');

// Получение всех проектов
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ createdBy: req.user.id });
        res.render('projects', { projects });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Создание нового проекта
exports.createProject = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newProject = new Project({
            name,
            description,
            createdBy: req.user.id
        });
        const project = await newProject.save();
        res.render('projectDetail', { project });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Получение проекта по ID
exports.getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        res.render('projectDetail', { project });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Обновление проекта
exports.updateProject = async (req, res) => {
    const { name, description } = req.body;
    try {
        let project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        project = await Project.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true }
        );
        res.render('projectDetail', { project });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Удаление проекта
exports.deleteProject = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        await Project.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Project removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Показ формы создания проекта
exports.showCreateProjectForm = (req, res) => {
    res.render('createProject');
};

// Показ формы редактирования проекта
exports.showEditProjectForm = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        res.render('editProject', { project });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
