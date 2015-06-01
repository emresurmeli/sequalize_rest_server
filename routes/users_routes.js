'use strict';

var bodyparser = require('body-parser');
var User = require('../models/Users');
var Sql = require('sequelize');
var sql = new Sql(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASS, {
	dialect: 'postgres'
});

module.exports = function(router) {
	// Use body parser to recieve JSON
	router.use(bodyparser.json());

	// POST
	router.post('/users', function(req, res) {
		sql.sync()
			.then(function() {
				User.create(req.body)
				.then(function(data) {
					res.json(data);
				})
				.error(function(err) {
					console.log(err);
					res.status(500).json({msg: 'internal server error'});
				});
		  });
	});

	//GET
	router.get('/users', function(req, res) {
		sql.sync()
			.then(function() {
				User.findAll()
					.then(function(data) {
						res.json(data);
					})
					.error(function(err) {
						console.log(err);
						res.status(500).json({msg: 'internal server error'});
					});
			});
	});

	//PUT
	router.put('/users/:id', function(req, res) {
		sql.sync()
			.then(function() {
				User.update(req.body, {where: {id: req.params.id}})
					.then(function(data) {
						res.json(data);
					})
					.error(function(err) {
						console.log(err);
						res.status(500).json({msg: 'internal server error'});
					});
			});
	});

	//DELETE
	router.delete('/users/:id', function(req, res) {
		sql.sync()
			.then(function() {
				User.destroy({where: {id: [req.params.id]}})
					.then(function(data) {
						res.json((typeof data === 'number') ? 'success' : 'error, wrong type of data');
					})
					.error(function(err) {
						console.log(err);
						res.status(500).json({msg: 'internal server error'});
					});
			});
	});
};