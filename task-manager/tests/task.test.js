const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const Task = require('../src/models/task');

const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create a task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my tests'
        })
        .expect(201);

    const task = await Task.findById(response.body._id);

    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
});
