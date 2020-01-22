const mongoose = require('mongoose');

// the database name: task-manager-api
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    userCreateIndex: true,
});

// User Model
const User = mongoose.model("User", {
    name: {
        type: String,
    },
    age: {
        type: Number,
    }
});

// Create a user
const me = new User({
    name: 'Edward',
    age: 27,
});

// Save the user
me.save().then(() => {
    console.log(me);
}).catch(error => {
    console.log("Error!", error);
});
