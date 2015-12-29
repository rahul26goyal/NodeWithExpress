// registration module routes handler
var async = require('async');
var joi = require('joi');
var dbModule = require('../services/db');
var schemaValidationModule = require('../schema/schemavalidator');
var userDetailsSchemaModule = require('../schema/userschema');
var loginSchemaModule = require('../schema/loginschema');
var bcrypt = require('bcrypt');

(function () {
	function registerUser() {  //dummy constructor

	}
	// static functions of this handler
	registerUser.handleNewRegistration = function (req, reply) {
		var body = req.body;
		console.log('new user registration received...', body);
		async.waterfall([
			function (cb) {
				validateUserDetailsPost(body, cb);
			},
			function (cb) {
				checkIfUserNameAlreadyExist(body.username, cb);
			},
			function(cb){
				hashUserPassword(body, cb);
			},
			function (data, cb) {
				console.log('new data===', data);
				insertNewUserDetailsInDB(data, cb);
			}
		],
			function (err, data) {
				reply(err, data);
			}
		);
	};
	
	registerUser.handleUserLogin = function (req, reply) {
		var body = req.body;
		async.waterfall([
			function (cb) { //validate data
				console.log('payload/body validation...');
				schemaValidationModule.validateSchema(req.body, loginSchemaModule.loginPostSchema,cb);
			},
			function(cb){ //check if user exist
				checkIfUserExist(body.username, cb);
			},
			function(hashPassword, cb){  //send user details to be displayed..
				console.log('hashpass exist==', hashPassword);
				if(!hashPassword){
					return cb({code:401, message:"Username Does not Exist", type:"Invalid Data"});
				}
				bcrypt.compare(body.password, hashPassword, function(err, result){
					if(err){
						return cb(err);
					}
					console.log('does password match ?',result);
					if(!result){
						return cb({code:401, message:"Username and Password does not match", type:'No Match Found'});
					}
					return cb(null,{code:200, message:"Loged In"});
				});
				//cb(null);
			}
		], function (err, data) {
			reply(err, data);
		});
	};
	
	
	// private function belonging to this scope only
	
	function hashUserPassword(data, callback) {
		console.log('hasing password===', data.password);
		bcrypt.genSalt(10, function(err, salt){
			if(err){
				return callback(err);
			}
			console.log('salt', salt);
			bcrypt.hash(data.password, salt,function(err, passwordHash){
				if(err){
					return callback(err);
				}
				data.passwordHash=passwordHash;
				return callback(null, data);
			});
		});
	}
	
	function insertNewUserDetailsInDB(userDetails, callback) {
		var dbConn = dbModule.getDBConn();
		dbConn.collection('User').insert(userDetails, function (err, data) {
			if (err) {
				return callback(err);
			}
			console.log('insert result...', data);
			delete data.ops;
			callback(null, data);
		});
	}

	function checkIfUserExist(username, callback) {
		var dbConn = dbModule.getDBConn();
		dbConn.collection('User').find({ username: username }).toArray(
			function (err, data) {
				if (err) {
					return callback(err);
				}
				console.log('userdb result ===', data, data.length === 0);
				if (data.length !== 0) {
					return callback(null, data[0].passwordHash);
				}
				callback(null, false);
			});
	};
	
	function checkIfUserNameAlreadyExist(username, callback) {
		var dbConn = dbModule.getDBConn();
		dbConn.collection('User').find({ username: username }).toArray(
			function (err, data) {
				if (err) {
					return callback(err);
				}
				if (data.length !== 0) {
					return callback({ code: 409, message: "username already exist", type: 'DbConflict' });
				}
				callback(null);
			});
	}

	function validateUserDetailsPost(data, callback) {
		joi.validate(data, userDetailsSchemaModule.userDetailsPostSchema, function (err, val) {
			if (err) {
				var error = {
					code: 400,
					message: err.details,
					type: err.name
				};
				return callback(error);
			}
			return callback(null);
		});
	};

	exports.registerUser = registerUser;
})();
