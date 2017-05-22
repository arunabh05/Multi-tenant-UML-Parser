var express = require('express')
  , routes = require('./routes')

  , http = require('http')
  , path = require('path');

var login = require('./routes/login');
var register = require('./routes/register');
var tenants = require('./routes/tenants');

var expressSession = require("express-session");

var session = require('client-sessions');
var app = express();

app.use(session({   
	cookieName: 'session',    
	secret: 'cloudgrader',    
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,  })); 

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon('public/images/favicon.PNG'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//GET requests
app.get('/', routes.index);
app.get('/home',routes.index);
app.get('/tenants',routes.index);
app.get('/records',tenants.records);

// POST requests
app.post('/login',login.afterLogin);
app.post('/register',register.registerUser);
app.post('/generateUML',tenants.generateUML);
app.post('/grade',tenants.grade);

app.post('/logout',function(req,res){
	if(req.session.username){
		req.session.username = null;
		req.session.destroy();
		res.status(200).send();
	}else{
		req.session.destroy();
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.status(200).send();
	}
});


http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});  