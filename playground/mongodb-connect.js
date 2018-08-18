// const MongoClient = require('mongodb').MongoClient;
//User the object destructuring to declare the above line.
const {
    MongoClient
} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', {
    useNewUrlParser: true
}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB Server!!');

    const db = client.db('TodoApp');

    ////Create a Todos collection to the database and add a sample document.
    // const collection = db.collection('Todos');
    // collection.insertOne({
    //     text: 'Somthing to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert ToDo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    ////Create User collections and add a sample document to the collection
    // const users = db.collection('Users');
    // users.insertOne({
    //     name: 'Manohar Kurapati',
    //     age: 38,
    //     location: 'Basildon'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unabler to inset to Users');
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //     console.log(result.ops[0]._id.getTimestamp());

    // });

    client.close();
});