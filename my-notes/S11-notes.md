# Section 11: REST APIs and Mongoose

## 1. Intro: Mongoose
It is time to create a REST API using Express. You will learn what exactly a REST API is and how it can be used as the back-end for a web or mobile application. This section also covers data validation, application architecture, async/await, and more.

## 2. Setting up Mongoose
Mongoose makes it easy to model and manage your application data. This includes data sanitization, data validation, and more. Mongoose will serve as a replacement for the native driver, providing you a more object oriented interface.

### Setting up Mongoose
First up, install Mongoose

```
npm install mongoose@5.3.16
```

Like the MongoDB native driver, Mongoose provides a `connect` function you can use to connect to your MongoDB database.

```
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser: true,
    useCreateIndex: true,
});
```

### Modeling Your Data
The core feature of Mongoose is the ability to model your data. A new model can be created for the different types of data your application needs to store. You can create as many models as your application needs.

The code below defines a user mode. The model definition is where you defines what makes up a user. This would include all the pieces of data you want to store in the database. The user model below has just two fields, a name and an age.

```js
const User = mongoose.model("User", {
    name: {
        type: String,
    },
    age: {
        type: Number,
    }
});
```

With the model defined, it is time to start creating and saving users. The `User` variable above stores the Mongoose model. This is a constructor function that can be used to create new users. The next snippet create a new user with the name `Sergio` and the age 27. This alone won't save any data to the database, but it is a step in the right direction.

````js
const me = new User({
    name: "Sergio",
    age: 27,
});
``` 

The new model instance can be saved to the database using the `save` method.

```js
me.save().then(() => {
    console.log(me);
}).catch((error) => {
   console.error("Error!", error)
})

```

### Links
+ [Mongoose](https://mongoosejs.com/)

## 3. Creating a Mongoose Model
Let's define the model for a Task. So, with the help of the notes in the section two, let's create a Task model with a description and a completed fields. The result is:

```js
const Task = mongoose.model("Task", {
    description: {
        type: String,
    },
    complete: {
        type: Boolean,
    },
});

const taskOne = new Task({
    description: "Clean my desk",
    complete: false,
});

taskOne.save().then(() => {
    console.log(taskOne);
}).catch((error) => {
    console.log("Error!", error);
});

```

## 4. Data Validation and Sanitization, Part I
Time to set up data validation and sanitization for our models. _Validation_ will allow you to restrict what data can be stored in the database, while _sanitization_ will allow you to store user data in a uniform and standardized way.

### Data Validation and Sanitization
First up, install validator. While Mongoose provides basic tools for performing validation, the validator library provides useful methods for validating data such as email addresses, phone numbers, zip codes, and more.

```
npm i validator@10.9.0
```
Mongoose comes with support for basic validation and sanitization. The user model below shows how this can be configured. `required` is used to validate that a value is provided for a given field. `trim`, is used to remove extra spaces before or after data. `lowercase` is used to convert the data lowercase before saving it to the database. You can find a complete list of options in the schema documentation.

You can also define custom validation for your models. This is done using `validate` as shown in the example below. The method gets called with the value to validate, and it should throw an error if the data is invalid. The next snippet uses the `isEmail` method from validator to validate the email address is valid before saving it to the database.

```js
const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    }
})
```

### Links
+ [Schema](https://mongoosejs.com/docs/schematypes.html)
+ [npm: validator](https://www.npmjs.com/package/validator)

## 5. Data Validation and Sanitization, Part II
It is up to you to add validation and sanitization to the task model. We suggest left the description field mandatory, and the complete field optional but assign `false` as default value.


You will also be defining a new field on the user model with validation and sanitization of its own. This new field is password, so it is recommendable to add a validation of a minimum of 7 characters and avoid to include the password word in this field.

## 6. Structuring a REST API

## 7. Installing Postman

## 8. Resource Creation Endpoints, Part I

## 9. Resource Creation Endpoints, Part II

## 10. Resource Reading Endpoints, Part I

## 11. Resource Reading Endpoints, Part II

## 12. Promises Chaining

## 13. Promises Chaining Challenge

## 14. Async/Await, Part I

## 15. Async/Await, Part II

## 16. Integrating Async/Await

## 17. Resource Updating Endpoints, Part I

## 18. Resource Updating Endpoints, Part II

## 19. Resource Deleting Endpoints

## 20. Separate Route Files
