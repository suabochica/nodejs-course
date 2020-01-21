# Section 10: MongoDB and Promises

## Index
1. Intro: MongoDB
2. MongoDB and NoSQL Databases
3. Installing MongoDB on macOS
4. Installing Database GUI Viewer
5. Connecting and Inserting Documents
6. Inserting Documents
7. The ObjectID
8. Querying Documents
9. Promises
10. Updating Documents
12. Deleting Documents

## 1. Intro: MongoDB
Let's introduce databases in our Node.js application, Here we will learn how to connect to a MongoDB database from your Node.js application. This will allow us to store data in a secure and reliable fashion. To illustrate this relation, we will create a _Task Application_ that will use MongoDB to store user accounts as well as tasks.

## 2. MongoDB and NoSQL Databases
Before to start with MongoDB, it is necessary explore the NoSQL concept. NoSQL stands for _not only SQL_. The NoSQL databases are a bit different that traditional SQL databases such as MySQL. However, we can define the theory behind NoSQL from the SQL concepts. Please check carefully the next image:

![image](../assets/sql_no_sql.png)

As you can see, the notion of the database is the same for both proposals. The difference is in the way how the data is stored. In SQL databases we have the next hierarchy:

1. Table
2. Row/Record
3. Column

For the other hand, in NoSQL the scheme is:

1. Collection
2. Document
3. Field

With this base, we can start to go deep with MongoDB, that is a NoSQL database.

## 3. Installing MongoDB on macOS
To install MongoDB on macOS, you can download the [MongoDB Community Server](https://www.mongodb.com/download-center/community). The download is a zip file. Unzip the contents, change the folder name to "mongodb", and move it to your users home directory. From there, create a "mongodb-data" directory at the same level of your "mongodb". This directory will store the database data.

Now, you can start the mongodb server using the following command:

```
/Users/{username}/mongodb/bin/mongod --dbpath=/Users/{username}/mongodb-data
```

This command will generate some contents inside the `~/mongodb-data` and also you will see an output in the terminal like:

```
NETWORK  [initandlisten] waiting for connections on port 27017
```

### Links
- [MongoDB download page](https://www.mongodb.com/download-center/community)

## 4. Installing Database GUI Viewer
The GUI (Graphic User Interface) that we will setup is Robo 3T. Robo T3 is a MongoDB admin tool that makes easy to manage and visualize the data in your database.

Robo 3T is a completely free MongoDB admin tool.

### Links
- [Robo 3T download page](https://robomongo.org/)

## 5. Connecting and Inserting Documents
Let's to connect your MongoDB database with a Node.js application, and then, insert documents into the database to save them for later.

### Connecting to MongoDB
MongoDB provides a native driver that allows you to connect to the database. You just need to provide two pieces of information. The first is the connection URL and the second is the name of the database. You can pick any database name that you like, but I suggest chose a coherent one.

```js
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Unable to connect database");
    }

    const db = client.db(databaseName);

    // Start to interact with the database
});
```

### Inserting a document
With the connection open, you are ready to insert documents to the database. Remember that a database is made up of collections, and collections are used to store documents. The code below inserts a new document into the "users" collection. `db.collection` is used to get a reference to the collection you are trying to manipulate. `insertOne` is used to insert a new document into that collection.

```
db.collection('users').insertOne({
    name: "Edward",
    age: 27
})
```

### Links
+ [npm:mongodb](https://www.npmjs.com/package/mongodb)
+ [MongoDB driver documentation](http://mongodb.github.io/node-mongodb-native/3.1/api/)

## 6. Inserting Documents
In the last section we review how to insert one document, this time we will learn how to insert several documents.

### Inserting Documents
Similar to the `insertOne` method, the collection object offer us a `insertMany` method to insert multiple documents at once. The example below inserts two documents into "tasks" collection. `insertMany` expects an array of objects, and an array of the documents you want to insert.

```js
db.collection('tasks').insertMany([
    {
        description: 'Task one description',
        complete: false
    },
    {
        description: 'Task two description',
        complete: false

    },
]
, (error, result) => {
    if (error) {
        return console,log("Unable to insert tasks!");
    }

    console.log(result.opts);
});

```

### Links
+ [insertOne](http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#insertOne)
+ [insertMany](http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#insertMany)

## 7. The ObjectID
MongoDB uses ObjectID's to create a unique identifiers for all the documents in the database. It is a different than the traditional auto-incrementing integer ID, but it comes with its own set of advantages, how for example, get a timestamp of the insertion of the document.

### Working with ObjectIDs
MongoDB provides `ObjectID` which can be used to generate new ObjectIDs. The example below generates a new Id and prints it to the console:

```js
const { MongoClient, ObjectID } =  mongodb;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectID();
console.log(id); // Print the id to the console
```

An ObjectID is a GUID (Global Uniques Identifier). GUIDs are generated randomly via an algorithm to ensure uniqueness. These IDs can be generated on the server, but as seen in the snippet above, they can be generated of the cliente ass weel. That means a client can generate ID for a document it is about to insert to the database.

### Links
+ [ObjectID](https://docs.mongodb.com/manual/reference/method/ObjectId/)

## 8. Querying Documents
Let's learn how to read data from MongoDB. This will allow you to fetch the documents that you had previously inserted.

### Finding Documents
You can search for documents in a given collection using `find` or `findOne`. `find` can be used to fetch multiple documents, while `findOne` can be used to fetch a single document.

The example below use `find` to search for documents in the tasks collection. You can provide an object as the first argument to `find` to filter documents. The example below sets `completed` equal to false to fetch only those tasks that have not been completed.

```js
db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    console.log(tasks)
})
```

The next example uses `findOne` to find a single document by its ID. In this case, it is necessary to pass the string version of the ID to the `ObjectID` constructor function to convert it to an ObjectID.

```js
db.collection('tasks').findOne({ _id: new
ObjectID("5c0fec243ef6bdfbe1d62e2f") }, (error, task) => {
    console.log(task)
})
```

### Links
+ [find](http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#find)
+ [findOne](http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#findOne)

## 9. Promises
It is important to understand the Promises feature. Promises provide a much needed alternative to the traditional pattern.

To illustrate the alternative, let's review the callback pattern. Please check the next code:

```js
const doWorkCallback = (callback) => {
   setTimeout(() => {
       callback("This is my error", undefined);
       // callback(undefined, [1, 1, 2]);
   }, 2000);
}

doWorkCallback((error, result) => {
   if(error) {
       return console.log(error);
   }

   console.log(result);
})
```
Remember that in the callback pattern just one callback function will be executed. The commented line above, is to illustrate the happy path to get a result from the callback. The disadvantage of the callback pattern is that we just have one function to handle two scenarios. Let's check how Promises solve this issue:

```js
const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve([4, 7, 1]);
        reject("Things went wrong");
    }, 2000);
});

doWorkPromise.then((result) => {
    console.log("Success!", result);
}).catch((error) => {
    console.log("Error!", error);
});
```
Promises offer us two functions `resolve` and `reject`. This functions follows the states definitions of a promise: pending, and then, fulfilled or rejected. This way we can handle the success path and the error path properly. It is important to notice that the `then` method just chain the success path of the promise and the `catch` method will chain the error path, and no matter the case, the promise will response the first function attended.

## 10. Updating Documents
You can update documents in a collection using `updateOne` or `updateMany`. The first argument for both methods is similar to the first argument used in `find` and `findOne`. It is an object that allows you to filter down all the documents to just the ones you want to update.

The update calls require a second argument as well. This is an object where you define the updates you want to make. For this, you need to use one of the supported _update operators_

The `updateOne` call below use `$inc` to increment the age field on the targeted document by 1.

```js
db.collection('users').updateOne({
    _id: new ObjectID("5c0fe6634362c1fb75b9d6b5")
}, {
    $inc: {
        age: 1 
    }
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})
```

The `updateMany` call below uses `$set` to set the **completed** field to `true` for all documents where the completed field is currently `false`.

```js
db.collection('tasks').updateMany({
    completed: false,
},
{
    $set: {
        completed: true,
    }
}).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});
```

### Links
+ [updateOne](http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#updateOne)
+ [updateMany](http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#updateMany)
+ [Update Operators](https://docs.mongodb.com/manual/reference/operator/update/#id1)

## 12. Deleting Documents
