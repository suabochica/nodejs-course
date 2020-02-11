const express = require('express');

require('./db/mongoose');

const userRoute = require('./routers/user');
const taskRoute = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

/**
  * Enable the json format from request parameters
  */
app.use(express.json());

//---------------------------------------------
// Express Middleware
//---------------------------------------------
// app.use((request, response, next) => {
//     if (request.process === 'GET') {
//         response.send("GET request area disabled");
//     } else {
//         next();
//     }
// });

// app.use((request, response, next) => {
//     response.status(503).send('503 error');
// });

//---------------------------------------------
// Routers
//---------------------------------------------
app.use(userRoute);
app.use(taskRoute);

//---------------------------------------------
// Port Server
//---------------------------------------------
app.listen(port, () => {
    console.log("Server is running on port " + port);
});

const jwt = require('jsonwebtoken');

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisismycourse', { 'expiresIn': '7 days' });
    console.log(token);

    const data = jwt.verify(token, 'thisismycourse');
    console.log(data);
};

myFunction();
