// mongodb connection

var mongo = require("mongodb");
var config  = require("../config");
var assert = require('assert');
var MongoClient = mongo.MongoClient;
/*
var testDbConnection = (function () {
	console.log('dbConnectionModule module loading..');
	function testDbConnection() {
		console.log('object of type dbConnection created....');
	}
	testDbConnection.connect = function() {
		console.log('testing db..');
		var url = config.database.url;//'mongodb://localhost:27017/mydb';
		console.log(url);
		MongoClient.connect(url, function (err, db) {
			assert.equal(null, err);
			console.log("Connected correctly to server.");
			testDbConnection.dbConnection = db;
			//db.close();
		});
	}
	return testDbConnection;
})();


exports.testDbConnection = testDbConnection;
*/
//module.exports = testDbConnection; //this will export this file as a function


