var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

//Create a Todo model document
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

//Create new instance of the document and add it to database
var newTodo = new Todo({
    text: 'Cycle 9 miles before 31-Aug'
});
newTodo.save().then((result) => {
    console.log('Todo Saved successfully! ', result);
}, (err) => {
    console.log('Unable to save todo', err);
});

//Create a Users model document with email validation//
var User = mongoose.model('user', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        validate: {
            validator: function (v) {
                var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(v);
            },
            message: props => `${props.value} is not a valid email id`
        }
    }
});

//create an user object// 
var newUser = new User({
    email: 'kvmanohar@gmail.com'
});

//Save the user object//
newUser.save().then((doc) => {
    console.log('User saved succesfully!', doc);
}, (err) => {
    console.log('Unable to add User document to database ', err);
});