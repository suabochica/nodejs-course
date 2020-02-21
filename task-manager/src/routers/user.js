const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const User = require('../models/user');

//---------------------------------------------
// Users resource actions
//---------------------------------------------

const router = new express.Router();

router.post('/users', async (request, response) => {
    const user = new User(request.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();

        response.status(201).send({ user, token });
    } catch (error) {
        response.status(400).send(error);
    }
});

router.post('/users/login', async (request, response) => {
    try {
        const user = await User.findByCredentials(request.body.email, request.body.password);
        const token = await user.generateAuthToken();

        response.send({ user, token });
    } catch (error) {
        response.status(400).send();
    }
});

router.post('/users/logout', auth, async (request, response) => {
    try {
        request.user.tokens = request.users.tokens.filter((token) => {
            return token.token !== request.token;
        });

        await request.user.save();

        response.send();
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post('/users/logoutAll', auth, async (request, response) => {
    try {
        request.user.tokens = [];
        await request.user.save();

        response.send();
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/users/me', auth, async (request, response) => {
    response.send(request.user);
});

router.patch('/users/me', auth, async(request, response) => {
    const updates = Object.keys(request.body);
    const allowedUpdates = ['name', 'password', 'email', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return response.status(400).send({ "error": "Invalid updates!" });
    }

    try {
        updates.forEach((update) => request.user[update] = request.body[update]);
        await request.user.save();

        response.send(request.user);
    } catch (error) {
        response.status(400).send(error);
    }
});

router.delete('/users/me', auth, async (request, response) => {
    try {
        await request.user.remove();
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});

const upload = multer({
    dest: 'avatars',
    limits: {
        fileSize: 1000000,
    },
    fileFilter(request, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error("Please upload a JPG, JPEG or PNG file."));
        } else {
            callback(undefined, true);
        }
    }
});

router.post('/users/me/avatar', upload.single('avatar'), (request, response) => {
    response.send();
}, (error, request, response, next) => {
    return response.status(400).send({error: error.message});
});

module.exports = router;
