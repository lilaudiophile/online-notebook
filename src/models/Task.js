//Название (Name): Строка, представляющая название задачи.
//Описание (Description): Текстовое поле для описания задачи.
//Дедлайн (Deadline): Дата и время дедлайна задачи.
//Статус (Status): Строка, представляющая текущий статус задачи (выполнена, в процессе и т.д.).
//Ответственный (Assignee): Ссылка на пользователя, который ответственен за выполнение задачи.
//Проект (Project): Ссылка на проект, с которым связана задача.

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  description: { 
    type: String 
},
  deadline: { 
    type: Date 
},
  status: { 
    type: String 
},
  assignee: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User' 
},
  project: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Project' 
}
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
