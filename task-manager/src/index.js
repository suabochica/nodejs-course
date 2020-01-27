const express = require('express');

require('./db/mongoose');

const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

/**
  * Enable the json format from request parameters
  */
app.use(express.json());

app.post('/users', (request, response) => {
    const user = new User(request.body);

    user.save().then(() => {
        response.send(user);
    }).catch((error) => {
        response.status(400).send(error);
    });
});

app.listen(port, () => {
    console.log("Server is running on port " + port);
});
