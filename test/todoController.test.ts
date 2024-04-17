import supertest from 'supertest'
import createServer from '../server'
import { Express } from 'express'
import { sequelize } from "../config/db";

let app: Express

const todoCreateBody = {
    text: "Testing todo " + Date.now()
}
const todoPatchBodyText = {
    text: "Testing todo modified " + Date.now()
}
const todoPatchBodyDone = {
    done: true
}
const todoPatchBodyTextAndDone = {
    text: "Testing todo modified twice " + Date.now(),
    done: false
}
const nonExistingTodoId = "Marin"
let idToBeCreated: string;

beforeAll(async () => {
    app = createServer()
    await sequelize.sync({ force: process.env.NODE_ENV === "test" })
})

describe('Create a todo', () => {
    it('should create a todo and return success response', async () => {
        const { body, statusCode } = await supertest(app).post('/api/todos').send(todoCreateBody)
        if (body.result && body.result.id) idToBeCreated = body.result.id
        expect(statusCode).toBe(201)
        expect(body.result.text).toBe(todoCreateBody.text)
    });
});

describe('Get all todos', () => {
    it('should get all todos', async () => {
        const { body, statusCode } = await supertest(app).get('/api/todos')
        expect(statusCode).toBe(200)
        expect(body.result.length).toBeGreaterThan(0)
    });
});

describe('Get a todo that doesnt exist', () => {
    it('should return 404 because the todo doesnt exist', async () => {
        const { statusCode } = await supertest(app).get(`/api/todos/${nonExistingTodoId}`)
        expect(statusCode).toBe(404)
    });
});
describe('Get a todo that exists', () => {
    it('should return 200 and todo body', async () => {
        const { body, statusCode } = await supertest(app).get(`/api/todos/${idToBeCreated}`)
        expect(statusCode).toBe(200)
        expect(body.result.text).toBe(todoCreateBody.text)
    });
});
describe('Patch a todo that doesnt exist', () => {
    it('should return 404 because the todo doesnt exist', async () => {
        const { statusCode } = await supertest(app).patch(`/api/todos/${nonExistingTodoId}`).send(todoPatchBodyText)
        expect(statusCode).toBe(404)
    });
});
describe('Patch the text field of a todo that exists', () => {
    it('should return 200 and todo body', async () => {
        const { body, statusCode } = await supertest(app).patch(`/api/todos/${idToBeCreated}`).send(todoPatchBodyText)
        expect(statusCode).toBe(200)
        expect(body.result.text).toBe(todoPatchBodyText.text)
    });
});
describe('Patch the done field of a todo that exists', () => {
    it('should return 200 and todo body', async () => {
        const { body, statusCode } = await supertest(app).patch(`/api/todos/${idToBeCreated}`).send(todoPatchBodyDone)
        expect(statusCode).toBe(200)
        expect(body.result.done).toBe(todoPatchBodyDone.done)
    });
});
describe('Patch the text and done fileds of a todo that exists', () => {
    it('should return 200 and todo body', async () => {
        const { body, statusCode } = await supertest(app).patch(`/api/todos/${idToBeCreated}`).send(todoPatchBodyTextAndDone)
        expect(statusCode).toBe(200)
        expect(body.result.text).toBe(todoPatchBodyTextAndDone.text)
    });
});