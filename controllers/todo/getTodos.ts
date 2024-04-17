import { Request, Response } from 'express'
import Todo from '../../models/TodoSchema';

const getTodos = async (req: Request<{}, {}, {}, { sort: string }>, res: Response) => {
    try {
        const order = req.query.sort === 'ASC' ? 'ASC' : 'DESC';
        const todos = await Todo.findAll({ order: [['createdAt', order]] });
        res.json({ message: "Successfully fetched todos.", result: todos });
    } catch (e: any) {
        console.log(e)
        return res.status(500).json({ message: "Error occured. Please try again.", error: e.message })
    }
}

export default getTodos