import { Request, Response } from 'express'
import Todo from '../../models/TodoSchema';

interface GetTodosRequest extends Request {
    query: { sort: string};
}

const getTodos = async (req: GetTodosRequest, res: Response): Promise<void> => {
    try {
        const order = req.query.sort === 'ASC' ? 'ASC' : 'DESC';
        const todos = await Todo.findAll({ order: [['createdAt', order]] });

        res.json({ message: "Successfully fetched todos.", result: todos });
    } catch (e: any) {
        console.log(e)
        res.status(500).json({ message: "Error occured. Please try again.", error: e.message })
    }
}

export default getTodos