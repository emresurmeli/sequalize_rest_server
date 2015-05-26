'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var User = require('../models/Users');
var Sql = require('sequelize');
var sql = new Sql('users_dev', 'users_dev', 'foobar123', {
	dialect: 'postgres'
});

chai.use(chaihttp);
require('../server');

describe('Users', function() {
  describe('with existing user', function() {
    var newUser;
    before(function(done) {
      sql.sync({force: true})
        .then(function() {
          User.create({userName: 'test'})
          .then(function(data) {
            newUser = data.dataValues;
            done();
          })
          .error(function(err){
            console.log(err);
            done();
          });
        });
    });

    describe('GET request', function() {
    	var test;
    	before(function(done) {
    		chai.request('localhost:3000')
    			.get('/api/users/test')
    			.end(function(err, res) {
    				expect(err).to.eql(null);
    				test = res.body;
    				done();
    		});
    	});

    	it('should return a user', function() {
    		expect(typeof test).to.eql('object');
    	});
    	it('should return a user name', function() {
    		expect(test.userName).to.eql(undefined);
    	});
    });

    describe('POST request', function() {
    	it('should create a new user', function(done) {
    		chai.request('localhost:3000')
    			.post('/api/users')
    			.send({userName: 'test'})
    			.end(function(err, res) {
    				expect(err).to.eql(null);
    				expect(res.body.userName).to.eql('test');
    				done();
    		});
    	});
    });

    describe('PUT request', function() {
    	var response;
    	before(function(done) {
    		chai.request('localhost:3000')
    			.put('/api/users' + newUser.id)
    			.send({userName: 'newname'})
    			.end(function(err, res) {
    				response = res.body;
    				done();
    		});
    	});

    	it('should update user name', function() {
    		expect(response).to.eql({});
    	});
    });

    describe('DELETE request', function() {
    	var response;
    	before(function(done) {
    		chai.request('localhost:3000')
    			.del('/api/users' + newUser.id)
    			.end(function(err, res) {
    				response = res.body;
    				done();
    		});
    	});

    	it('removes a user from the DB', function(done) {
    		chai.request('localhost:3000')
    			.get('/api/users')
    			.end(function(err, res) {
    				expect(err).to.eql(null);
    				done();
    		});
    	});

    	it('posts json msg success', function() {
    		expect(response).to.eql({});
    	});
    });
  });
});