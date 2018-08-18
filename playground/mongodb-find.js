const {
    MongoClient,
    ObjectID
} = require('mongodb');

//Set the connection to the database
MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if (err) {
        return console.log('Unable to connect to the Database.');
    }
    console.log('Connection to MongoDB server!');

    //Get the Database from the client
    const db = client.db("TodoApp");
    const todosCollection = db.collection('Todos');

    //Count the documents in the collection
    todosCollection.find().count().then((count) => {
        console.log(`Todos Count: ${count}`);
    }, (err) => {
        console.log('Unable to count the records', err);
    });

    //fetch the database from the collection
    todosCollection.find({
        completed: true
    }).toArray().then((docs) => {
        console.log('Todos:');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    //fetch the database collection using the _id
    todosCollection.find({
        _id: new ObjectID('5b77f9dd3f4f7c73c5d60215')
    }).toArray().then((docs) => {
        console.log('Todos:');
        console.log(docs);
    }, (err) => {
        console.log('Unable to fetch todos by id', err);
    });


    //Get users collection
    const usersCollection = db.collection('Users');
    usersCollection.find().toArray().then((docs) => {
        console.log('Users Collections:');
        console.log(docs);
    }, (err) => {
        console.log('Unable to fetch users collection', err);
    });

    // client.close();
});