var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');
var fileUpload = require('express-fileupload');

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');

var umlparser = require('./routes/umlparser');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, '/public/images/logo.PNG')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));



app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

// development only
if ('development' == app.get('env')) {
	app.use(errorHandler());
}

app.post('/tenant3/generateUML',umlparser.generateUML);

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
