const mongoose = require('mongoose');

// the database name: task-manager-api
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    userCreateIndex: true,
});

const Task = mongoose.model("Task", {
    description: {
        type: String,
        required: true,
        trim: true,
    },
    complete: {
        type: Boolean,
        required: false,
        default: false,
    },
});
