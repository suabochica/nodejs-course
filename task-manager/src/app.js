const express = require('express');

require('./db/mongoose');

const userRoute = require('./routers/user');
const taskRoute = require('./routers/task');

const app = express();

/**
  * Enable the json format from request parameters
  */
app.use(express.json());

//---------------------------------------------
// Routers
//---------------------------------------------
app.use(userRoute);
app.use(taskRoute);


module.exports = app;
