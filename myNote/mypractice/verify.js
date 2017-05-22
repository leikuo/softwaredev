var PORT = 5000;
var http = require('http');
var qs = require('qs');

var TOKEN = 'sspku01';

function checkSignature(params, token){
	
	var key = [token, params.timestamp, params.nonce].sort().join('');
	var shal = require('crypto').createHash('shal');
	shal.update(key);
	
	return shal.digest('hex') == params.signature;
}

var server = http.createServer(function(request, response){
	
	var query = require('url').parse(request.url).query;
	var params = qs.parse(query);
	
	console.log(params);
	console.log("token-->",TOKEN);
	
	if(checkSignature(params,TOKEN)){
		response.end(params.echostr);
	}else{
		response.end('signature fail');
	}
});

server.listen(PORT);
console.log("Server running at port: " + PORT + ".");