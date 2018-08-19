const {
    MongoClient,
    ObjectID
} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoClient');
    }
    console.log('Connected to Mongo Client');

    const db = client.db("TodoApp"); //Get database from the Client
    const todoCollection = db.collection("Todos");

    // //Delete Many
    // todoCollection.deleteMany({
    //     completed: true
    // }).then((result) => {
    //     console.log(result);
    // });

    //Delete One - will delete the first item that matches the critiria
    // todoCollection.deleteOne({
    //     completed: false
    // }).then((result) => {
    //     console.log(result);
    // });

    //Find one and Delete One
    todoCollection.findOneAndDelete({
        text: 'Walk the dog 3'
    }).then((result) => {
        console.log(result);
    });

    client.close();
});