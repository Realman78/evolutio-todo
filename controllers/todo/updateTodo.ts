import { Request, Response } from 'express'
import Todo from '../../models/TodoSchema';

const updateTodo = async (req: Request<{ id: string }, {}, { text: string, done: boolean }, {}>, res: Response) => {
    try {
        if (!req.params.id) return res.status(400).json({ message: 'No ID provided.' })

        const { text, done } = req.body;
        const todo = await Todo.update({ text, done, updatedAt: new Date() }, {
            where: { id: req.params.id }
        });
        
        // Moram na novo fetchat jer sqlite+sequalize ne podrzava da gornja 
        // linija vrati ažurirani objekt
        const updatedTodo = await Todo.findByPk(req.params.id)

        if (todo[0] === 1) {
            res.json({ message: "Successfully updated todo.", result: updatedTodo, number: process.env.RECEIVER });
        } else {
            res.status(404).json({ error: 'Todo not found.' });
        }
    } catch (e: any) {
        console.log(e)
        return res.status(500).json({ message: "Error occured. Please try again.", error: e.message })
    }
}
export default updateTodo