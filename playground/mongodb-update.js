const {
    MongoClient,
    ObjectID
} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if (err) {
        return console.log('Unable to connect to Mongo Client');
    }
    console.log('Connected to Mongo Client.');

    const db = client.db('TodoApp');
    const todoCollections = db.collection('Todos');

    todoCollections.findOneAndUpdate({
        _id: ObjectID('5b79d62ff1457702ab479da5')
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    const usersCollection = db.collection('Users');
    usersCollection.findOneAndUpdate({
        name: 'Manohar Kurapati'
    }, {
        $set: {
            name: 'Manohar'
        },
        $inc: {
            age: 1
        }
    }).then((result) => {
        console.log(result);
    });

    client.close();

});