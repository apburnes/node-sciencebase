'use strict';

var _ = require('lodash');
var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-as-promised'));

var processQuery = require('../lib/processQuery');

var queryString = 'water';
var queryArray = ['water', 'earth', 'wind', 'fire'];
var stringedArray = queryArray.join(',');

var config = {
  baseUrl: 'https://www.sciencebase.gov/catalog/items',
  format: 'json',
  max: 20
};

var configKeys = _.keys(config);

describe('Process Query', function() {

  it('should return an object q property with an input string', function(){
    var objKeys = _.keys(config).concat('q');

    return expect(processQuery(queryString, config))
      .to.eventually.be.an('object')
      .and.to.have.keys(objKeys)
      .then(function(obj) {
        expect(obj).to.have.property('q', queryString);
        expect(obj).to.have.property('baseUrl', config.baseUrl);
        expect(obj).to.have.property('format', config.format);
        expect(obj).to.have.property('max', config.max);
      });
  });

  it('should return an object with q property with an input array', function() {
    var objKeys = _.keys(config).concat('q');

    return expect(processQuery(queryArray, config))
      .to.eventually.be.an('object')
      .and.to.have.keys(objKeys)
      .then(function(obj) {
        expect(obj).to.have.property('q', stringedArray);
        expect(obj).to.have.property('baseUrl', config.baseUrl);
        expect(obj).to.have.property('format', config.format);
        expect(obj).to.have.property('max', config.max);
      });
  });

  it('should return an object with q property with an input object q value of string', function() {
    var query = _.assign({}, config, {
      q: queryString
    });

    var objKeys = _.keys(query);

    return expect(processQuery(query, config))
      .to.eventually.be.an('object')
      .and.to.have.keys(objKeys)
      .then(function(obj) {
        expect(obj).to.have.property('q', queryString);
        expect(obj).to.have.property('baseUrl', config.baseUrl);
        expect(obj).to.have.property('format', config.format);
        expect(obj).to.have.property('max', config.max);
      });
  });

  it('should return an object with q property with an input object q value of array', function() {
    var query = _.assign({}, config, {
      q: queryArray
    });

    var objKeys = _.keys(query);

    return expect(processQuery(query, config))
      .to.eventually.be.an('object')
      .and.to.have.keys(objKeys)
      .then(function(obj) {
        expect(obj).to.have.property('q', stringedArray);
        expect(obj).to.have.property('baseUrl', config.baseUrl);
        expect(obj).to.have.property('format', config.format);
        expect(obj).to.have.property('max', config.max);
      });
  });

  it('should return an object with q, fields properties', function() {
    var query = _.assign({}, config, {
      q: queryString,
      fields: queryString
    });

    var objKeys = _.keys(query);

    return expect(processQuery(query, config))
      .to.eventually.be.an('object')
      .and.to.have.keys(objKeys)
      .then(function(obj) {
        expect(obj).to.have.property('q', queryString);
        expect(obj).to.have.property('fields', queryString);
        expect(obj).to.have.property('baseUrl', config.baseUrl);
        expect(obj).to.have.property('format', config.format);
        expect(obj).to.have.property('max', config.max);
      });
  });

  it('should return an object with q, folderId properties', function() {
    var query = _.assign({}, config, {
      q: queryString,
      folderId: queryString
    });

    var objKeys = _.keys(query);

    return expect(processQuery(query, config))
      .to.eventually.be.an('object')
      .and.to.have.keys(objKeys)
      .then(function(obj) {
        expect(obj).to.have.property('q', queryString);
        expect(obj).to.have.property('folderId', queryString);
        expect(obj).to.have.property('baseUrl', config.baseUrl);
        expect(obj).to.have.property('format', config.format);
        expect(obj).to.have.property('max', config.max);
      });
  });

  it('should return an object with q, fields, folderId properties from objects with array values', function() {
    var query = _.assign({}, config, {
      q: queryArray,
      fields: queryString,
      folderId: queryArray
    });

    var objKeys = _.keys(query);

    return expect(processQuery(query, config))
      .to.eventually.be.an('object')
      .and.to.have.keys(objKeys)
      .then(function(obj) {
        expect(obj).to.have.property('q', stringedArray);
        expect(obj).to.have.property('fields', queryString);
        expect(obj).to.have.property('folderId', stringedArray);
        expect(obj).to.have.property('baseUrl', config.baseUrl);
        expect(obj).to.have.property('format', config.format);
        expect(obj).to.have.property('max', config.max);
      });
  });

  it('should reject when passed an invalid data type', function() {
    var invalidData = 1;
    return expect(processQuery(invalidData, config))
      .to.eventually.be.rejectedWith(Error);
  });
});
