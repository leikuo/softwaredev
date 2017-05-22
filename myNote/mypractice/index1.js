var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'mynode',
	password:'123456',
	database: 'mynode'
});

/* connection.connect(function(err){
	if(err) throw err;
	connection.query('SELECT * FROM user', function(err, ret){
		if(err) throw err;
		console.log(ret);
		connection.end();
	});
});
 */

 connection.connect(function(err){
	 if(err) throw err;
	 
	 var value = 'abcd';
	 var query = connection.query('SELECT * FROM user where name="'+value+'"', function(err,ret){
		 if (err) throw err;
		 
		 console.log(ret);
		 connection.end();
	 });
	 
	 console.log(query.sql);
 });
 
 
 
 
 
 
 
 
 