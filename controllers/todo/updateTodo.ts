import { Request, Response } from 'express';
import Todo from '../../models/TodoSchema';
import sendMessage from '../../util/smsSender';
import { generateSMSBody } from '../../util/utils';

interface UpdateTodoRequest extends Request {
    params: { id: string };
    body: { text: string; done: boolean };
}

const updateTodo = async (req: UpdateTodoRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const { text, done } = req.body;

    if (!id) {
        res.status(400).json({ message: 'No ID provided.' });
        return;
    }

    try {
        const updateResult = await Todo.update({ text, done, updatedAt: new Date() }, { where: { id } });

        if (updateResult[0] !== 1) {
            res.status(404).json({ error: 'Todo not found.' });
            return;
        }

        // Moram na novo fetchat jer sqlite+sequalize ne podrzava vracanje azuriranog objekta 
        const updatedTodo = await Todo.findByPk(id);
        if (!updatedTodo) {
            res.status(404).json({ error: 'Failed to retrieve updated todo.' });
            return;
        }

        let messageSent = false;
        if (done) {
            const receiverNumber = process.env.RECEIVER;
            const sender = process.env.SENDER || "Evolutio Team";
            if (receiverNumber) {
                messageSent = await sendMessage(receiverNumber, generateSMSBody(updatedTodo.text, sender));
            }
        }

        res.json({ message: "Successfully updated todo.", result: updatedTodo, messageSent });

    } catch (e: any) {
        console.log(e)
        res.status(500).json({ message: "Error occured. Please try again.", error: e.message })
    }
};

export default updateTodo;
