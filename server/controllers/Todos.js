import * as Todo from '../models/Todo.js';

export async function getTodos(req, res) {
    try {
        const todos = await Todo.find();

        res.status(200).json(todos);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export async function createTodo (req, res) {
    const todo = req.body;

    const newTodo = new Todo({
        ...todo
    });

    try {
        await newTodo.save();

        res.status(201).json(newTodo);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

