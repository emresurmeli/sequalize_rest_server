'use strict';

var Sql = require('sequelize');
var sql = new Sql('users_dev', 'users_dev', 'foobar123', {
	dialect: 'postgres'
});

var User = module.exports = sql.define('User', {
	userName: Sql.STRING
});

User.sync();