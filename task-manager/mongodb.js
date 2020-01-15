const mongodb = require("mongodb");
const { MongoClient, ObjectID } =  mongodb;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectID();
console.log(id); // Print the id to the console

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Unable to connect database");
    }

    const db = client.db(databaseName);
/*

    db.collection('users').insertOne({
        name: 'Edward',
        age: 27
    }, (error, result) => {
        if (error) {
            return console,log("Unable to insert document");
        }

        console.log(result.opts);
    });

    db.collection('users').insertMany([
        {
            name: 'Alphonse',
            age: 25
        },
        {
            name: 'Winry',
            age: 26
        },
    ]
    , (error, result) => {
        if (error) {
            return console,log("Unable to insert tasks!");
        }

        console.log(result.opts);
    });

*/
    db.collection('tasks').insertMany([
        {
            description: 'Task one description',
            complete: false
        },
        {
            description: 'Task two description',
            complete: false
        },
        {
            description: 'Task three description',
            complete: false
        },
    ]
    , (error, result) => {
        if (error) {
            return console,log("Unable to insert tasks!");
        }

       console.log(result.opts);
    });
});
