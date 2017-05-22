var later = require('later');
var https = require('https');

var appid = "wxb89a39e13fc829fb";
var appsecret = "3d35b2f3d02170134fb410513e52d3c0";
var access_token;

later.date.localTime();
console.log("Now:" + new Date());

var sched = later.parse.recur().every(1).hour();
next = later.schedule(sched).next(10);
console.log(next);

var timer = later.setInterval(test, sched);
setTimeout(test, 2000);

function test(){
	console.log(new Date());
	var options = {
		hostname:'api.wexin.qq.com',
		path:'cgi-bin/token?grant_type=client_credential&appid='+appid
			+'&secret='+appsecret
	};
	
	var req = https.get(options, function(res){
		var bodyChunks='';
		res.on('data', function(chunk){
			bodyChunks += chunk;
		});
		
		res.on('end',function(){
			var body = JSON.parse(bodyChunks);
			
			if(body.access_token){
				access_token = body.access_token;
				console.log(access_token);
			}else{
				console.dir(body);
			}
		});
	});
	
	req.on('error', function(e){
		console.log('ERROR:' + e.message);
	});
}