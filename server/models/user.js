const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//Create a Users model document with email validation//
// {
// 	email:'sample@gmail.com',
// 	password:'apssred',
// 	token:[{
// 		access: 'auth',
// 		token: 'kodsfuerjnbpaodpuDkfjDIKpwOEirnD='
// 	}]
// }
var UserSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email id'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	tokens: [
		{
			access: {
				type: String,
				required: true
			},
			token: {
				type: String,
				required: true
			}
		}
	]
});

UserSchema.methods.generateAuthToken = function() {
	var user = this;
	var access = 'auth';
	var token = jwt
		.sign({ _id: user._id.toHexString(), access: access }, 'abc123')
		.toString();
	user.tokens.push({ access, token });
	return user.save().then(() => {
		return token;
	});
};

//model method
UserSchema.statics.findByToken = function(token) {
	var User = this;
	var decoded;

	try {
		decoded = jwt.verify(token, 'abc123');
	} catch (error) {
		return Promise.reject();
	}
	return User.findOne({
		_id: decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
};

//Override the toJSON method
UserSchema.methods.toJSON = function() {
	var user = this;
	var userObject = user.toObject();
	return _.pick(userObject, ['_id', 'email']);
};

var User = mongoose.model('user', UserSchema);
module.exports = {
	User
};
