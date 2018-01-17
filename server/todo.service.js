const Todo = require('./todo.model');
const ReadPreference = require('mongodb').ReadPreference;

require('./mongo').connect();

function getTodos(req, res) {
  const docquery = Todo.find({}).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(todos => res.status(200).json(todos))
    .catch(error => {
      res.status(500).send(error);
      return;
    });
}

function postTodo(req, res) {
  const originalTodo = {
    id: req.body.todo.id,
    name: req.body.todo.name,
    saying: req.body.todo.saying
  };
  const todo = new Todo(originalTodo);
  todo.save(error => {
    if (checkServerError(res, error)) return;
    res.status(201).json(todo);
    console.log('Todo created successfully!');
  });
}

function putTodo(req, res) {
  const originalTodo = {
    id: parseInt(req.params.id, 10),
    name: req.body.todo.name,
    saying: req.body.todo.saying
  };
  Todo.findOne({ id: originalTodo.id }, (error, todo) => {
    if (checkServerError(res, error)) return;
    if (!checkFound(res, todo)) return;

    todo.name = originalTodo.name;
    todo.saying = originalTodo.saying;
    todo.save(error => {
      if (checkServerError(res, error)) return;
      res.status(200).json(todo);
      console.log('Todo updated successfully!');
    });
  });
}

function deleteTodo(req, res) {
  const id = parseInt(req.params.id, 10);
  Todo.findOneAndRemove({ id: id })
    .then(todo => {
      if (!checkFound(res, todo)) return;
      res.status(200).json(todo);
      console.log('Todo deleted successfully!');
    })
    .catch(error => {
      if (checkServerError(res, error)) return;
    });
}

function checkServerError(res, error) {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}

function checkFound(res, todo) {
  if (!todo) {
    res.status(404).send('Todo not found.');
    return;
  }
  return todo;
}

module.exports = {
  getTodos,
  postTodo,
  putTodo,
  deleteTodo
};
