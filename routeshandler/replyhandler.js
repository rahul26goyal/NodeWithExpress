// this will be the replyhandler

function replyHandler (){
	
}

replyHandler.prototype.replyWithError = function(res,err){
	console.log('ErroLog : ', new Date(), " : ",err);
	var code = err.code || 500;
	var message  = err.message || "Error Occured";
	var type = err.type || "UnknownType";
	var error = {code : code,message : message, type: type};
	res.status(code).send(error);
}

replyHandler.prototype.replyWrapper = function (res) {
        var me = this;
        return function (err, data) {
            if (err) {
				console.log('error');
                return me.replyWithError(res, err);
            }
			console.log('result');
            res.status(200).send(data);
        };
    };
	
	replyHandler.prototype.test = function(){
		console.log('replyhandler working correctly...');
	}
	

module.exports = replyHandler;	