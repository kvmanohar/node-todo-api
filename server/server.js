var express = require("express");
var bodyParser = require("body-parser");
var { ObjectID } = require("mongodb");

//Local imports
var { mongoose } = require("./db/mongoose");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");

const port = process.env.PORT || 3000;

var app = express();

//Middleware to convert the app req to JSON
app.use(bodyParser.json());

//POST Endpoint: /todos
app.post("/todos", (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});
	todo.save().then(
		doc => {
			res.send(doc);
		},
		err => {
			res.status(400).send(err);
		}
	);
});

//GET Endpoint: /todos
app.get("/todos", (req, res) => {
	Todo.find().then(
		todos => {
			res.send({ todos });
		},
		e => {
			res.status(400).send(e);
		}
	);
});

//GET Endpoint: /todo/1243452 ---> Get todo item by passing id
app.get("/todo/:id", (req, res) => {
	var id = req.params.id;
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findById(id)
		.then(todo => {
			if (!todo) {
				return res.status(404).send(null);
			}
			res.status(200).send({ todo });
		})
		.catch(e => {
			res.status(400).send();
		});
});

//DELET Endpoint: /todo/:id ---> Delete todo item by passing id
app.delete("/todo/:id", (req, res) => {
	var id = req.params.id;
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}
	Todo.findOneAndDelete({ _id: id })
		.then(todo => {
			if (!todo) {
				return res.status(404).send();
			}
			res.status(200).send(todo);
		})
		.catch(e => {
			res.status(400).send(e);
		});
});

app.listen(port, () => {
	console.log(`Started on port ${port}`);
});

module.exports = {
	app
};
