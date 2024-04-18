import express from 'express'
import ejv from 'express-joi-validation'
import Joi from 'joi'

import errorHandler from '../controllers/errorHandler'
import { getTodos, getTodo, createTodo, updateTodo } from '../controllers/todo/todoController'

const router = express.Router()
const validator = ejv.createValidator({})

const createTodoSchema = Joi.object({
    text: Joi.string().trim().min(1).max(256).required(),
})
const updateTodoSchema = Joi.object({
    text: Joi.string().trim().min(1).max(256),
    done: Joi.bool()
}).or('text', 'done');

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     description: Adds a new todo to the list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 description: The content of the todo.
 *     responses:
 *       201:
 *         description: Todo created successfully.
 *       400:
 *         description: Invalid todo body.
 *       500:
 *         description: Server error.
 */
router.post('/', validator.body(createTodoSchema), createTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Retrieve a single todo
 *     description: Fetches a single todo by ID from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID.
 *     responses:
 *       200:
 *         description: Todo retrieved successfully.
 *       404:
 *         description: Todo not found.
 *       500:
 *         description: Server error.
 */
router.get('/:id', getTodo);

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Retrieve all todos
 *     description: Fetches all todos from the database, optionally sorted.
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort order, either ASC or DESC.
 *     responses:
 *       200:
 *         description: Todos retrieved successfully.
 *       500:
 *         description: Server error.
 */
router.get('/', getTodos);

/**
 * @swagger
 * /api/todos/{id}:
 *   patch:
 *     summary: Update a todo
 *     description: Updates a todo item by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The updated text for the todo.
 *               done:
 *                 type: boolean
 *                 description: The completion status of the todo.
 *     responses:
 *       200:
 *         description: Todo updated successfully.
 *       400:
 *         description: Invalid todo body.
 *       404:
 *         description: Todo not found.
 *       500:
 *         description: Server error.
 */
router.patch('/:id', validator.body(updateTodoSchema), updateTodo)

router.get('/*', errorHandler)


export default router