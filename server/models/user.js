var mongoose = require("mongoose");

//Create a Users model document with email validation//
var User = mongoose.model("user", {
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		validate: {
			validator: function(v) {
				var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				return emailRegex.test(v);
			},
			message: props => `${props.value} is not a valid email id`
		}
	}
});

module.exports = {
	User
};
