//Название (Name): Строка, представляющая название проекта.
//Описание (Description): Текстовое поле для описания проекта.

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  description: { 
    type: String 
}
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
