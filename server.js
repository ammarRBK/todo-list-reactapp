//get express to use
const express= require('express');
var favicon = require('serve-favicon');
var app= express();

//database
var mongoose= require('mongoose');
var db= require('./database/db');
//track HTTP calls
var morgan= require('morgan');
app.use(morgan('dev'));

//body-parser
var bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//using path midleware for using files will be a routes for the main server
var path= require('path');
//require the route files
var users= require('./routes/users');
var tasks= require('./routes/tasks');


//stastic folder
app.use(express.static(path.join(__dirname,'build')));

//using routes
app.use('/api/users',users);
app.use('/api/tasks',tasks);

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
  
  module.exports = app;