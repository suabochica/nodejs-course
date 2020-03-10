const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user.js');

const userOne = {
    name: 'Alphonse',
    email: 'alphonse@elric.com',
    password: 'FullMetal2!'
}

beforeEach(async() => {
    await User.deleteMany();
    await new User(userOne).save();
});

test('Should sign up a new user', async () => {
    await request(app).post('/users').send({
        name: 'Edward',
        email: 'edward@elric.com',
        password: 'MyPass777!'
    }).expect(201);
});

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
});

test('Should not login non existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: "No password"
    }).expect(400);
});
