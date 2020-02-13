const mongoose = require('mongoose');

const Task = mongoose.model("Task", {
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        required: false,
        default: false,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = Task;
