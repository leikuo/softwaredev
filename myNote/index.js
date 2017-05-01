var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var crypto = require('crypto');

//引入mongoose
var mongoose = require('mongoose');

//引入模型
var models = require('./models/models');

var User = models.User;

//使用mongoose连接服务
mongoose.connect('mongodb://123.207.167.38:27017/notes');
mongoose.connection.on('error', console.error.bind(console, '连接数据库失效'));

var app = express();

//定义EJS模板引擎和模板文件位置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//定义文件静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

//定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
	res.render('index', {
		title: '首页'
	});
});


app.get('/register', function(req, res){
	console.log('注册！');
	res.render('register', {
		title: '注册'
	});
});

app.get('/login', function(req, res){
	console.log('登录！');
	res.render('login', {
		title:'登录'
	});
});

app.get('/quit', function(req, res){
	console.log('退出！');
	return res.redirect('/login');
});

app.get('/post', function(req, res){
	console.log('发布！');
	res.render('post', {
		title: '发布'
	});
});

app.get('/detail/', function(req, res){
	console.log('查看笔记！');
	res.render('detail', {
		title:'查看笔记'
	});
});


//post请求
app.get('/register', function(req, res){
	//req.body可以获取到表单的每项数据
	var username = req.body.username,
		password = req.body.password,
		passwordRepeat = req.body.passwordRepeat;
		
	//检查输入的用户名是否为空，使用trim去掉两端空格
	if (username.trim().length() == 0){
		console.log('密码不能为空！');
		return res.redirect('/register');
	}
	
	//检查输入的密码是否为空，使用trim去掉两端空格
	if(password.trim().length == 0 || passwordRepeat.trim().length == 0){
		console.log('密码不能为空！');
		return res.redirect('/register');
	}
	
	//检查两次输入的密码是否一致
	if(password != passwordRepeat){
		console.log('两次输入的密码不一致！');
		return res.redirect('/register');
	}
	
	//检查用户名是否已经存在，如果不存在，则保存该条记录
	User.findOne({username:username}, function(err, user){
		if(err){
			console.log(err);
			return res.redirect('/register');
		}
		
		if(user){
			console.log('用户名已经存在');
			return res.redirect('/register');
		}
		
		//对密码进行md5加密
		var md5 = crypto.createHash('md5');
			md5password = md5.update(password).digest('hex');
			
		//新建user对象用于保存数据
		var newUser = new User({
			username: username,
			password: md5password
		});
		
		newUser.save(function(err, doc){
			if(err){
				console.log(err);
				return res.redirect('/register');
			}
			console.log('注册成功！');
			return res.redirect('/');
		});
			
	});
});


//监听3000端口
app.listen(3000,function(req, res){
	console.log('app is running at port 3000');
});

















