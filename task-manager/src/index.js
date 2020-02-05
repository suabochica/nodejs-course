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
