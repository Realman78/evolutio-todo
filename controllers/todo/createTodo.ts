import { Request, Response } from 'express'
import Todo from '../../models/TodoSchema';

interface CreateTodoRequest extends Request {
    body: { text: string };
}

const createTodo = async (req: CreateTodoRequest, res: Response): Promise<void> => {
    try {
        const { text } = req.body;
        const todo = await Todo.create({ text });
        res.status(201).json({ message: "Successfully created todo.", result: todo });
    } catch (e: any) {
        console.log(e)
        res.status(500).json({ message: "Error occured. Please try again.", error: e.message })
    }
}

export default createTodo