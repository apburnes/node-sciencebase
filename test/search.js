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
    var reqObject = {
      q: 'water'
    };
    
    client.search(reqObject, function(err, data) {
      expect(data).to.be.instanceof(Object);
      expect(data).to.have.keys(returnKeys);
      expect(data.statusCode).to.be.equal(200);
      expect(data.body).to.have.keys(bodyKeys);
      expect(data.body.items).to.be.instanceof(Array);
      expect(data.body.items.length).to.be.above(0);
      done();
    });
  });
  
  it('should return success searching catalog for query "water" with a promise', function() {
    var reqObject = {
      q: 'water'
    };
    
    return expect(client.search(reqObject))
      .to.eventually.be.instanceof(Object)
      .and.to.have.keys(returnKeys)
      .then(function(data) {
        expect(data.statusCode).to.be.equal(200);
        expect(data.body).to.have.keys(bodyKeys);
        expect(data.body.items).to.be.instanceof(Array);
        expect(data.body.items.length).to.be.above(0);
        return;
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
  
  it('should return an not found with invalid query object key', function() {
    var invalidReq = {
      foobarbaz: 'foobarbaz'
    };
    
    return expect(client.search(invalidReq))
      .to.eventually.be.an.instanceof(Object)
      .then(function(data) {
        return expect(data.statusCode).to.be.equal(404);
      });
  });
  
  it('should reject with an invalid, non-object request data type', function() {
    return expect(client.search('foobarbaz'))
      .to.eventually.be.rejectedWith(Error);
  });
});
