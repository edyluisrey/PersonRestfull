var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var cors = require('cors');

var MongoClient = require('mongodb').MongoClient;
var dbUrl ="mongodb://sacc:sacc@ds149874.mlab.com:49874/sacc";

var persons = require('./routes/persons');
var locations = require('./routes/locations');
var emails = require('./routes/emails');
var phones = require('./routes/phones');

var app = express();
var router = express.Router();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Enabling CORS
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});


//JWT 
var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://edyluisrey.auth0.com/.well-known/jwks.json"
    }),
    audience: 'mwa',
    issuer: "https://edyluisrey.auth0.com/",
    algorithms: ['RS256']
});
app.use(jwtCheck);

app.use('/api', persons);
app.use('/api', locations);
app.use('/api', emails);
app.use('/api', phones);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Reuse database connections in routes (or other app) files
MongoClient.connect(dbUrl,(err,db)=>{
	if(err) throw err;    
	app.locals.db = db;
    app.listen(3000, function() {
      console.log('Listening on port 3000');
    });    
});

module.exports = app;
