var express = require("express");
var joi = require('joi');
var async = require('async');
var router = express.Router();
var dbModule  = require('../services/db')


var registrationModule = require('../routeshandler/registerroutehandler');
var ReplyHandlerModule = require('../routeshandler/replyhandler');

var replyHandler = new ReplyHandlerModule();

router.use(function(req, res, next){
  console.log('Middle wear Log only for /api/v1');
  req.db = dbModule.getDBConn();
  next();	
});

router.get('/', function(req, res){
	res.send('=========== /api/v1/ ==========');	
});

router.get('/rahul', function(req, res){
	console.log('req==',req.db);
	res.send("API tested..");
});


router.post('/register', function(req, res){
	registrationModule.registerUser.handleNewRegistration(req, replyHandler.replyWrapper(res));
});

router.post('/login', function(req, res){
	console.log('login post called---', req.body);
	registrationModule.registerUser.handleUserLogin(req, replyHandler.replyWrapper(res))
});

router.get('/details', function(req, res){
	var db = req.db;
    db.collection('Person').find().toArray(function(err,data){
		console.log('data===', data);
		res.send(data);
	});
	
});


router.post('/details', function(req,res){
	
});


module.exports = router;