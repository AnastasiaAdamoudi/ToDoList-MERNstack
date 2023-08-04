import express from 'express';
import * as toDoControllers from '../controllers/toDoControllers.js'; // import all functions from toDoControllers.js

export const toDoRouter = express.Router(); // create router

toDoRouter.get('/', toDoControllers.getTodos); // get all todos
toDoRouter.post('/', toDoControllers.createTodo); // create a todo
// toDoRouter.patch('/:id', toDoControllers.updateTodo); // update a todo
// toDoRouter.delete('/:id', toDoControllers.deleteTodo); // delete a todo