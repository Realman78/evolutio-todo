import { Request, Response } from 'express'
import Todo from '../../models/TodoSchema';

interface GetTodoRequest extends Request {
    params: { id: string };
}

const getTodo = async (req: GetTodoRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: 'No ID provided.' })
            return
        }
        const todo = await Todo.findByPk(id)
        if (todo) {
            res.json({ message: "Successfully fetched todo.", result: todo });
        } else {
            res.status(404).json({ error: 'Todo not found.' });
        }
    } catch (e: any) {
        console.log(e)
        res.status(500).json({ message: "Error occured. Please try again.", error: e.message })
    }
}

export default getTodo