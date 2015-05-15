'use strict';

var express = require('express');
var app = express();
var usersRouter = express.Router();

require('./routes/users_routes')(usersRouter);

app.use('/api', usersRouter);
app.listen(3000, function() {
	console.log('server is running on localhost:3000');
});