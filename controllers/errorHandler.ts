import { Request, Response } from 'express'

const errorHandler = async (req: Request, res: Response) => {
    return res.status(404).json({ message: 'Path not found. ERROR 404.' })
}
export default errorHandler