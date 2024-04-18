import express, { Request, Response } from 'express'
import cors from 'cors'
import path from 'path'
import helmet from "helmet";

import errorHandler from './controllers/errorHandler'
import todoRoutes from './routes/todoRouter'

const createServer = (): express.Express => {
    const app = express()

    app.use(express.json())
    app.use(cors())
    app.use(express.urlencoded({ extended: false }))
    app.use(helmet());

    //Routers
    app.use('/api/todos', todoRoutes)

    app.get('/api/health', async (req: Request, res: Response) => {
        res.status(200).json({ message: 'Server is healthy.' })
    });

    app.get('/api/*', errorHandler)

    app.use(express.static(path.join(__dirname, '..', 'build')));

    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
    });

    return app
}

export default createServer