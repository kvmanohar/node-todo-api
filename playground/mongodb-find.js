const {
    MongoClient
} = require('mongodb');

//Set the connection to the database
MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if (err) {
        return console.log('Unable to connect to the Database.');
    }
    console.log('Connection to MongoDB server!');

    //Get the Database from the client
    const db = client.db("TodoApp");

    //fetch the data from the collection
    const todosCollection = db.collection('Todos');
    todosCollection.find().toArray().then((docs) => {
        console.log('Todos:');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todso', err);
    });

    // client.close();
});