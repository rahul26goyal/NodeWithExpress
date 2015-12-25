var express = require("express");

var router = express.Router();

//belowe this we will add the api and the path associated with it

router.use(function(req, res, next){
  console.log('Middle wear Log only for /api/')
  next();	
});

router.get('/v1/', function(req, res){
	res.send('=========== /api/v1/ ==========');	
});

router.get('/v1/rahul', function(req, res){
	res.send("API tested..");
});

router.get

module.exports = router;