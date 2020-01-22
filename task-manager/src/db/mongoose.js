const mongoose = require('mongoose');
const validator = require('validator');

// the database name: task-manager-api
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    userCreateIndex: true,
});

const User = mongoose.model("User", {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes("password")) {
                throw new Error('The password should not contain the password word');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value <  0) {
                throw new Error('Age must be a positive number');
            }
        }
    }
});

const me = new User({
    name: 'Alphonse',
    email: 'fullmetal@alchemist.com',
    password: 'phone432!',
    age: 29,
});

me.save().then(() => {
    console.log(me);
}).catch(error => {
    console.log("Error!", error);
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

const taskOne = new Task({
    description: "Read 1984",
});

taskOne.save().then(() => {
    console.log(taskOne);
}).catch((error) => {
    console.log("Error!", error);
});
