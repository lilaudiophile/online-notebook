const Task = require('../models/Task');

// Добавление комментария к задаче
exports.addComment = async (req, res) => {
    const { comment } = req.body;
    try {
        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        const newComment = {
            text: comment,
            author: req.user.id,
            date: Date.now()
        };
        task.comments.unshift(newComment);
        await task.save();
        res.render('taskDetail', { task });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Показ формы добавления комментария
exports.showAddCommentForm = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        res.render('addComment', { task });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
