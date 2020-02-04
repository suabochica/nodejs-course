const express = require('express');

require('./db/mongoose');

const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

/**
  * Enable the json format from request parameters
  */
app.use(express.json());

//---------------------------------------------
// Users resource actions
//---------------------------------------------

app.get('/users', async (request, response) => {
    const users = await User.find({});

    try {
        response.send(users);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get('/users/:id', async (request, response) => {
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

app.post('/users', async (request, response) => {
    const user = new User(request.body);

    try {
        await user.save();
        response.status(201).send(user);
    } catch (error) {
        response.status(400).send(error);
    }
});

app.patch('/users/:id', async(request, response) => {
    const updates = Object.keys(request.body);
    const allowedUpdates = ['name', 'password', 'email', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return response.status(400).send({ "error": "Invalid updates!" });
    }

    try {
        const user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true, });

        if (!user) {
            return response.status(404).send();
        }

        response.send(user);
    } catch (error) {
        response.status(400).send(error);
    }
});

//---------------------------------------------
// Tasks resource actions
//---------------------------------------------

app.get('/tasks', async (request, response) => {
    const tasks =  await Task.find({});

    try {
        response.send(tasks);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get('/tasks/:id', async (request, response) => {
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

app.post('/tasks', async (request, response) => {
    const task = new Task(request.body);
    try {
        await task.save();
        response.status(201).send(task);
    } catch (error) {
        response.status(400).send(error);
    }
});

app.patch('/tasks/:id', async(request, response) => {
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

app.listen(port, () => {
    console.log("Server is running on port " + port);
});
