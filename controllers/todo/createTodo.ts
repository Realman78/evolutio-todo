import { Request, Response } from 'express'
import Todo from '../../models/TodoSchema';

const postTodo = async (req: Request<{}, {}, { text: string }, {}>, res: Response) => {
    try {
        const { text } = req.body;
        const todo = await Todo.create({ text });
        res.status(201).json({ message: "Successfully created todo.", result: todo });
    } catch (e: any) {
        console.log(e)
        return res.status(500).json({ message: "Error occured. Please try again.", error: e.message })
    }
}

export default postTodo