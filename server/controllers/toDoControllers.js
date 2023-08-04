import Todo from '../models/toDoModel.js'; // import the Todo model because we need to use it to create a new todo, update a todo, delete a todo, etc.
import mongoose from 'mongoose'; // import mongoose to check if the id is valid or not)
import Joi from 'joi'; // import Joi validation library to validate the request body

export async function getTodos(req, res) { // async function to get all todos
    try {
        const todos = await Todo.find(); // fetch all todos from the database and store them in the todos variable

        res.status(200).json(todos); // send the todos as a json response to the client
    } catch (error) {
        res.status(404).json({ message: error.message }); // if there is an error, send the error message as a json response to the client
    }
}

export async function createTodo(req, res) { // async function to create a new todo
    const todoSchema = Joi.object({ // create a schema to validate the request body (the text of the todo)
        text: Joi.string().required().max(100) // the text of the todo is required and must be a string with a maximum of 100 characters
    });

    const { error } = todoSchema.validate(req.body); // if there is an error, store the error in the error variable
    
    const todotext = req.body.text; // get the text of the todo from the request body if there is no error

    const newTodo = new Todo({ // create a new todo using the Todo model
        text: todotext  // set the text of the todo to the text from the request body
    });

    await newTodo.save(); // save the new todo to the database

    res.status(201).json(newTodo); // send the new todo as a json response to the client
}

export async function editTodo(req, res, id) { // async function to edit the text of a todo
    const todoSchema = Joi.object({
        id: Joi.string().required(),
        text: Joi.string().required().max(100)
    });
    
    const { error } = todoSchema.validate(req.body);

    const { id: _id } = req.params; // get the id of the todo from the request parameters
    const todotext = req.body.text; 

    if (!mongoose.Types.ObjectId.isValid(_id)) { // check if the id is valid or not
        return res.status(404).send('No todo with that id');
    }
    else {
        const editedTodo = await Todo.findById(_id); // fetch the todo from the database
        if (!editedTodo) {
            return res.status(404).send('No todo with that id'); // if there is no todo with that id, send a 404 error
        }

        editedTodo.text = todotext; // update the text of the todo to the text from the request body (the text the user wants to change the todo to)
        await editedTodo.save();

        res.status(200).json(editedTodo);
    }
}

export async function completeTodo(req, res, id) { // async function to mark a todo as complete
    const todoSchema = Joi.object({
        id: Joi.string().required(), // the id of the todo is required and must be a string (the id of the todo the user wants to mark as complete)
        complete: Joi.boolean().required() // the complete status of the todo is required and must be a boolean (true or false)
    });

    const { error } = todoSchema.validate(req.params);

    const { id: _id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No todo with that id');
    }
    else {
        const todo = await Todo.findById(_id); // fetch the todo from the database
        if (!todo) {
            return res.status(404).send('No todo with that id');
        }

        todo.complete = !todo.complete // if the todo is complete, mark it as incomplete, if the todo is incomplete, mark it as complete

        await todo.save();

        res.status(200).json(todo);
    }
}

export async function deleteTodo(req, res, id) { // async function to delete a todo
    const todoSchema = Joi.object({
        id: Joi.string().required() // the id of the todo is required and must be a string (the id of the todo the user wants to delete)
    });

    const { error } = todoSchema.validate(req.params);

    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No todo with that id');
    }
    else {
        await Todo.findByIdAndRemove(_id);
        res.status(200).json({ message: 'Todo deleted successfully' });
    }
}