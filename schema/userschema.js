
var joi  = require("joi");

var userDetailsPostSchema = joi.object().keys({
	firstname : joi.string().min(1).max(30).required(),
	lastname  : joi.string().min(1).max(25).optional(),
	username  : joi.string().min(5).max(20).required(),
	password  : joi.string().min(6).max(25).required(),
	email     : joi.string().email().required(),
	mobile    : joi.string().min(10).max(12).optional()
});

/*var validateUserDetailsPost = function(data, callback){
	joi.validate(data, userDetailsPostSchema, function(err, val){
		if(err){
			var error = {
				code : 400,
				message : err.details,
				type : err.name	
			};
			return callback(error);
		}
		return callback(null);
	});
};
*/
//exports.validateUserDetailsPost = validateUserDetailsPost;
exports.userDetailsPostSchema=userDetailsPostSchema;
