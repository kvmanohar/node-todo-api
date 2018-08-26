const { ObjectID } = require("mongodb");
const expect = require("expect");
const request = require("supertest");

const { app } = require("./../server");
const { Todo } = require("./../models/todo");

//Create dummy todos
const todos = [
	{
		_id: new ObjectID(),
		text: "First test todo"
	},
	{
		_id: new ObjectID(),
		text: "Second test todo"
	}
];

//before each test - Clear the database and add the dummy todos
beforeEach(done => {
	Todo.deleteMany({})
		.then(() => {
			return Todo.insertMany(todos);
		})
		.then(() => done());
});

describe("POST /todos", () => {
	it("should create a new todo", done => {
		//Todo Text to pass
		var text = "Test new todo text";

		request(app)
			.post("/todos")
			.send({ text })
			.expect(200)
			.expect(res => {
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.find({ text })
					.then(todos => {
						expect(todos.length).toBe(1);
						expect(todos[0].text).toBe(text);
						done();
					})
					.catch(e => done(e));
			});
	});

	it("should not create a todo with invalid body data", done => {
		request(app)
			.post("/todos")
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				Todo.find({})
					.then(todos => {
						expect(todos.length).toBe(2);
						done();
					})
					.catch(e => done(e));
			});
	});
});

describe("GET /todos", () => {
	it("should return all todos", done => {
		request(app)
			.get("/todos")
			.expect(200)
			.expect(res => {
				expect(res.body.todos.length).toBe(2);
			})
			.end(done);
	});
});

describe("GET /todos:id", () => {
	it("should return todo doc", done => {
		request(app)
			.get(`/todo/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect(res => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});

	it("should return 404 if todo is not found", done => {
		var hexId = new ObjectID().toHexString();
		request(app)
			.get(`/todo/${hexId}`)
			.expect(404)
			.end(done);
	});

	it("should return 404 for non-object ids", done => {
		request(app)
			.get("/todos/1243bcf")
			.expect(404)
			.end(done);
	});
});
