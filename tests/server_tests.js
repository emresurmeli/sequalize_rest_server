'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var User = require('../models/Users');
var Sql = require('sequelize');
var sql = new Sql('users_dev', 'users_dev', 'foobar123', {
	dialect: 'postgres'
});

require('../server');

describe('User data', function() {
	describe('User creation', function() {
		var newUser;
		before(function(done) {
			sql.sync({force: true})
				.then(function() {
					User.create({userName: 'name'})
						.then(function(data) {
							newUser = data.dataValues;
							done();
						})
						.error(function(err) {
							console.log(err);
							done();
						});
				});
		});

		after(function(done) {
			var userId;
			sql.sync({force: true})
				.then(function() {
					User.findAll()
						.then(function(data) {
							userId = [];
							data.forEach(function(val, index, array) {
								userId.push(val.id);
								if(data.length -1 === index) {
									User.destroy({where: {id: userId}});
									done();
								}
							});
						});
				});
		});

		//GET test
		describe('GET request for User', function() {
			var user;
			before(function(done) {
				chai.request('localhost:3000')
					.get('/api/users/user')
					.end(function(err, res) {
						user = res.body;
						console.log('response body: ' + res.body);
						done();
					});
			});

			it('should return the user', function() {
				expect(typeof user).to.eql('object');
			});
			it('should return the user name', function() {
				expect(user.userName).to.eql('user');
			});
		});

		//Post test
	});
});










