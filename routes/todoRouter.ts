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

router.get('/', getTodos)
router.get('/:id', getTodo)
router.post('/', validator.body(createTodoSchema), createTodo)
router.patch('/:id', validator.body(updateTodoSchema), updateTodo)

router.get('/*', errorHandler)


export default router