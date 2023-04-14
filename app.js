var express = require('express');
var path = require('path');
const dotenv = require('dotenv');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
const permissions = require('./helpers/permissions');


// call the setPermissions() function to set permissions for all roles
permissions.setPermissions();

dotenv.config( {path: '.env'})

const PORT = process.env.PORT || 8001;

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public')) //Why dis commented out? GPT - if you uncomment it, it will serve any files in the public directory at the root URL of your server.


//Routes
app.use('/', indexRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
