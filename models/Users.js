'use strict';

var Sql = require('sequelize');
var sql = new Sql(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
	dialect: 'postgres'
});

var User = module.exports = sql.define('User', {
	userName: Sql.STRING
});

User.sync();