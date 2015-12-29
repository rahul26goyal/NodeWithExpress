// schema

var joi  = require('joi');

var loginPostSchema = joi.object().keys({
	username: joi.string().alphanum().min(5).max(20).required(),
	password: joi.string().min(6).max(25).required()
});

//exports.validateLoginPost = validateLoginPost;
exports.loginPostSchema=loginPostSchema; 