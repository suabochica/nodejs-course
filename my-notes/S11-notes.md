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

## 4. Data Validation and Serialization, Part I

## 5. Data Validation and Serialization, Part II

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
