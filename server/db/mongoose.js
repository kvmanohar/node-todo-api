var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/TodoApp");
console.log(`MongoDB Heroku URI: ${process.env.MONGODB_URI}`);

mongoose.connect(process.env.MONGODB_URI);

module.exports = {
	mongoose
};
