const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: String,
    saying: String
  },
  {
    collection: 'todos',
    read: 'nearest'
  }
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
