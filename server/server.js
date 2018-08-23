var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

//Create a model for the document
var Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

//Create new instance of the document and add it to database
var newTodo = new Todo({
    text: 'Cook dinner'
});
newTodo.save().then((result) => {
    console.log('Todo Saved successfully! ', result);
}, (err) => {
    console.log('Unable to save todo');
});