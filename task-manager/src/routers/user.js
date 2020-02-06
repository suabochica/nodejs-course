const express = require('express');
const User = require('../models/user');

//---------------------------------------------
// Users resource actions
//---------------------------------------------

const router = new express.Router();

router.get('/users', async (request, response) => {
    const users = await User.find({});

    try {
        response.send(users);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/users/:id', async (request, response) => {
    const _id = request.params.id;

    try {
        const user = await User.findById(_id);

        if (!user) {
            response.status(404).send();
        }

        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post('/users', async (request, response) => {
    const user = new User(request.body);

    try {
        await user.save();
        response.status(201).send(user);
    } catch (error) {
        response.status(400).send(error);
    }
});

router.patch('/users/:id', async(request, response) => {
    const updates = Object.keys(request.body);
    const allowedUpdates = ['name', 'password', 'email', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return response.status(400).send({ "error": "Invalid updates!" });
    }

    try {
        const user = await User.findByIdAndUpdate(request.params.id);

        updates.forEach((update) => user[update] = request.body[update]);
        await user.save();

        if (!user) {
            return response.status(404).send();
        }

        response.send(user);
    } catch (error) {
        response.status(400).send(error);
    }
});

router.delete('/users/:id', async (request, response) => {
    const _id = request.params.id;

    try {
        const user = await User.findByIdAndDelete(_id);

        if (!user) {
            response.status(404).send();
        }

        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;
