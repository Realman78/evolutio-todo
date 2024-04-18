import express, { Request, Response } from 'express'
import cors from 'cors'
import path from 'path'
import helmet from "helmet";
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import errorHandler from './controllers/errorHandler'
import todoRoutes from './routes/todoRouter'

const createServer = (): express.Express => {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Evolutio Todo API Documentation',
        version: '1.0.0',
        description: 'Evolutio Todo API Documentation'
      },
    },
    apis: ['./routes/*.ts']
  };

  const swaggerSpec = swaggerJsDoc(options);

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
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });

  return app
}

export default createServer