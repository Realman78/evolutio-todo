import { Request, Response } from 'express'
import Todo from '../../models/TodoSchema';

const getTodo = async (req: Request<{ id: string }, {}, {}, {}>, res: Response) => {
    try {
        if (!req.params.id) return res.status(400).json({ message: 'No ID provided.' })

        const todo = await Todo.findByPk(req.params.id)
        if (todo) {
            res.json({ message: "Successfully fetched todo.", result: todo });
        } else {
            res.status(404).json({ error: 'Todo not found.' });
        }
    } catch (e: any) {
        console.log(e)
        return res.status(500).json({ message: "Error occured. Please try again.", error: e.message })
    }
}

export default getTodo