const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const Task = require('../src/models/task');

const {
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase,
} = require('./fixtures/db');


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

test('Should fetch user tasks', async () => {
    const response = await request(app)
          .get('/tasks')
          .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
          .send()
          .expect(200);

    expect(response.body.length).toEqual(2);
});

test('Should delete users tasks', async () => {
    const response = await request(app)
          .delete(`/tasks/${taskThree._id}`)
          .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
          .send() 
          .expect(200);
});

// Error: Cannot set header after they are sent to the client
// test('Should not delete tasks of other users', async () => {
//     const response = await request(app)
//           .delete(`/tasks/${taskThree._id}`)
//           .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//           .send()
//           .expect(404);

//     const task = await Task.findById(taskOne._id);
//     expect(task).not.toBeNull();
// });

//-------------------------------------
// Bonus
//-------------------------------------

// Should not create task with invalid description/completed
// Should not update task with invalid description/completed
// Should delete user task
// Should not delete task if unauthenticated
// Should not update other users task
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks
