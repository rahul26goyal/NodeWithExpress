// this will have utility function to validate schemas
var joi = require('joi');

var validateSchema = function(data,schema, callback){
	joi.validate(data, schema, function(err, value){
		if(err){
			var error = {
				code : 400,
				message : err.details,
				type : err.name
			};
			return callback(error);
		}
		console.log('validated...', value);
		return callback(null);
    });
}

exports.validateSchema = validateSchema;