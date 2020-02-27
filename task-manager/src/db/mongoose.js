const mongoose = require('mongoose');

// the database name: task-manager-api
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    userCreateIndex: true,
    useFindAndModify: false,
});

