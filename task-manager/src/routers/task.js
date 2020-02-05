const express = require('express');
const Task = require('../models/task');

//---------------------------------------------
// Tasks resource actions
//---------------------------------------------
const router = new express.Router();

router.get('/tasks', async (request, response) => {
    const tasks =  await Task.find({});

    try {
        response.send(tasks);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/tasks/:id', async (request, response) => {
    const _id = request.params.id;

    try {
        const task = await Task.findById(_id);

        if (!task) {
            return response.status(404).send();
        }

        response.send(task);
    } catch (error) {
        reponse.status(500).send(error);
    }
});

router.post('/tasks', async (request, response) => {
    const task = new Task(request.body);
    try {
        await task.save();
        response.status(201).send(task);
    } catch (error) {
        response.status(400).send(error);
    }
});

router.patch('/tasks/:id', async(request, response) => {
    const updates = Object.keys(request.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return response.status(400).send({ "error": "Invalid updates!" });
    }

    try {
        const task = await Task.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true, });

        if (!task) {
            return response.status(404).send();
        }

        response.send(task);
    } catch (error) {
        response.status(400).send(error);
    }
});

router.delete('/tasks/:id', async (request, response) => {
    const _id = request.params.id;

    try {
        const task = await Task.findByIdAndDelete(_id);

        if (!task) {
            response.status(404).send();
        }

        response.send(task);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;
