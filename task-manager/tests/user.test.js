const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const User = require('../src/models/user.js');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Alphonse',
    email: 'alphonse@elric.com',
    password: 'FullMetal2!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach(async() => {
    await User.deleteMany();
    await new User(userOne).save();
});

test('Should sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Edward',
        email: 'edward@elric.com',
        password: 'MyPass777!'
    }).expect(201);

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assert that the response body is the expected object
    expect(response.body).toMatchObject({
        user: {
            name: 'Edward',
            email: 'edward@elric.com',
        },
        token: user.tokens[0].token
    });

    // Assert that the user password was hashed
    expect(user.password).not.toBe('MyPass777!');
});

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);

    const user = await User.findById(userOneId);

    // Assert that token in response matches with the second token
    expect(response.body.token).toBe(user.tokens[1].token);

});

test('Should not login non existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: "No password"
    }).expect(400);
});

test('Should get profile for user', async () => {
    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
    await request(app).get('/users/me')
        .send()
        .expect(401);
});

test('Should delete user profile', async () => {
    await request(app).delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const user = await User.findById(userOneId);

    // Assert that the user is null
    expect(user).toBeNull();
});

test('Should not get profile for unauthenticated user', async () => {
    await request(app).delete('/users/me')
        .send()
        .expect(401);
});

// test('Should upload image avatar', async () => {
//     await request(app).post('/users/me/avatar')
//         .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//         .attach('avatar', 'tests/fixtures/slbenitezd.jpg')
//         .expect(200);

//     const user = await User.findById(userOneId);
//     expect(user.avatar).toEqual(expect.any(Buffer));
// });

test('Should update valid user field', async () => {
    await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Winry'
        })
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user.name).toEqual('Winry');
});

test('Should not update invalid users field', async () => {
    await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Bogota'
        })
        .expect(400);
});
