var mongo = require('mongodb');
var config = require('../config.json');
var assert = require('assert');
var MongoClient = mongo.MongoClient;
console.log('loading dbbbb');

var state = {
	db : null	
};
 
function connect (uri){
	if(state.db){
		//do nothing
	}
	MongoClient.connect(uri, function(err, db) {
		if(err){
			throw err;
		}
		console.log('connected to db');
		state.db = db;
	});
}

exports.connect = connect;

exports.getDBConn = function() {
	/*if(!state.db){
		console.log('re create db conn');
			connect("mongodb://localhost:27017/mydb");
	}*/
	return state.db;
		
}
