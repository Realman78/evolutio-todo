import { Request, Response } from 'express'
import Todo from '../../models/TodoSchema';
import sendMessage from '../../util/smsSender'
import { generateSMSBody } from '../../util/utils'

const updateTodo = async (req: Request<{ id: string }, {}, { text: string, done: boolean }, {}>, res: Response) => {
    try {
        if (!req.params.id) return res.status(400).json({ message: 'No ID provided.' })

        const receiverNumber = process.env.RECEIVER

        const { text, done } = req.body;
        const todo = await Todo.update({ text, done, updatedAt: new Date() }, {
            where: { id: req.params.id }
        });

        // Moram na novo fetchat jer sqlite+sequalize ne podrzava da gornja 
        // linija vrati ažurirani objekt
        const updatedTodo = await Todo.findByPk(req.params.id)

        if (todo[0] === 1 && updatedTodo) {
            if (receiverNumber && updatedTodo.done)
                await sendMessage(receiverNumber, generateSMSBody(updatedTodo.text));
            res.json({ message: "Successfully updated todo.", result: updatedTodo });
        } else {
            res.status(404).json({ error: 'Todo not found.' });
        }
    } catch (e: any) {
        console.log(e)
        return res.status(500).json({ message: "Error occured. Please try again.", error: e.message })
    }
}
export default updateTodo