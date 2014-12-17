'use strict';

var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-as-promised'));

var client = require('../index')();

var returnKeys = [
  'statusCode',
  'headers',
  'path',
  'method',
  'body'
];

var bodyKeys = [
  'total',
  'selflink',
  'nextlink',
  'items'
];

describe('Science Base Search', function() {

  it('should return success searching catalog for query "water" with a callback', function(done) {
    var queryObject = {
      q: 'water'
    };

    client.search(queryObject, function(err, data) {
      expect(data).to.be.instanceof(Object);
      expect(data).to.have.keys(returnKeys);
      expect(data.statusCode).to.be.equal(200);
      expect(data.body).to.have.keys(bodyKeys);
      expect(data.body.total).to.be.above(0);
      expect(data.body.items).to.be.instanceof(Array);
      expect(data.body.items.length).to.be.above(0);
      done();
    });
  });

  it('should return success searching catalog for query "water" with a promise', function() {
    var queryObject = {
      q: 'water'
    };

    return expect(client.search(queryObject))
      .to.eventually.be.instanceof(Object)
      .and.to.have.keys(returnKeys)
      .then(function(data) {
        expect(data.statusCode).to.be.equal(200);
        expect(data.body).to.have.keys(bodyKeys);
        expect(data.body.total).to.be.above(0);
        expect(data.body.items).to.be.instanceof(Array);
        expect(data.body.items.length).to.be.above(0);
      });
  });

  it('should return success searching catalog with a string', function() {
    var queryString = 'water';

    return expect(client.search(queryString))
      .to.eventually.be.instanceof(Object)
      .and.to.have.keys(returnKeys)
      .then(function(data) {
        expect(data.statusCode).to.be.equal(200);
        expect(data.body).to.have.keys(bodyKeys);
        expect(data.body.total).to.be.above(0);
        expect(data.body.items).to.be.instanceof(Array);
        expect(data.body.items.length).to.be.above(0);
      });
  });

  it('should return success searching catalog with an array', function() {
    var queryArray = ['water', 'earth', 'plants'];

    return expect(client.search(queryArray))
      .to.eventually.be.instanceof(Object)
      .and.to.have.keys(returnKeys)
      .then(function(data) {
        expect(data.statusCode).to.be.equal(200);
        expect(data.body).to.have.keys(bodyKeys);
        expect(data.body.total).to.be.above(0);
        expect(data.body.items).to.be.instanceof(Array);
        expect(data.body.items.length).to.be.above(0);
      });
  });

  it('should return success status with no results', function() {
    var reqObject = {
      q: 'foobarbaz'
    };

    return expect(client.search(reqObject))
      .to.eventually.be.instanceof(Object)
      .and.to.have.keys(returnKeys)
      .then(function(data) {
        expect(data.statusCode).to.be.equal(200);
        expect(data.body.total).to.be.equal(0);
        expect(data.body.items).to.be.instanceof(Array);
        expect(data.body.items).to.be.empty;
        return;
      });
  });

  it('should reject with invalid query object key', function() {
    var invalidReq = {
      foobarbaz: 'foobarbaz'
    };

    return expect(client.search(invalidReq))
      .to.eventually.be.rejectedWith(Error);
  });
});