import express from 'express';
import * as toDoControllers from '../controllers/toDoControllers.js'; // import all functions from toDoControllers.js

export const toDoRouter = express.Router(); // create router

toDoRouter.get('/', toDoControllers.getTodos); // get all todos
toDoRouter.post('/add', toDoControllers.createTodo); // create a todo
toDoRouter.patch('/edit/:id', toDoControllers.editTodo); // edit the text of a todo
toDoRouter.get('/complete/:id', toDoControllers.completeTodo); // mark a todo as complete or incomplete
toDoRouter.delete('/delete/:id', toDoControllers.deleteTodo); // delete a todo