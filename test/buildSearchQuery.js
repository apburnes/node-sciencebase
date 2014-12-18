'use strict';

var _ = require('lodash');
var qs = require('qs');
var chai = require('chai');
var expect = chai.expect;

var buildSearchQuery = require('../lib/buildSearchQuery');

var stringValue = 'water';

var config = {
  baseUrl: 'https://www.sciencebase.gov/catalog/items',
  s: 'Search',
  format: 'json',
  max: '20'
};

describe('Build Search Query', function() {

  function parseUrl(url) {
    var q = url.split('?')[1];
    return qs.parse(q);
  }

  function buildTest(query, callback) {
    callback(buildSearchQuery(query), parseUrl(buildSearchQuery(query)));
  }

  it('should return a valid querystring with key "q" for query', function(done) {
    var query = _.assign({}, config, {
      q: stringValue
    });

    buildTest(query, function(string, parsedUrl) {
      var queryKeys = _.pull(_.keys(query), 'baseUrl');
      expect(string).to.be.a('string');
      expect(parsedUrl).to.have.keys(queryKeys);
      expect(parsedUrl.s).to.equal('Search');
      expect(parsedUrl.q).to.equal(stringValue);
      expect(parsedUrl.format).to.equal(query.format);
      expect(parsedUrl.max).to.equal(query.max);
      done();
    });
  });

  it('should return a valid querystring with fields property added', function(done) {
    var query = _.assign({}, config, {
      q: stringValue,
      fields: stringValue
    });

    buildTest(query, function(string, parsedUrl) {
      var queryKeys = _.pull(_.keys(query), 'baseUrl');
      expect(string).to.be.a('string');
      expect(parsedUrl).to.have.keys(queryKeys);
      expect(parsedUrl.s).to.equal('Search');
      expect(parsedUrl.q).to.equal(stringValue);
      expect(parsedUrl.format).to.equal(query.format);
      expect(parsedUrl.fields).to.equal(query.fields);
      expect(parsedUrl.max).to.equal(query.max);
      done();
    });
  });

  it('should return a valid querystring with folderId property added', function(done) {
    var query = _.assign({}, config, {
      q: stringValue,
      folderId: stringValue
    });

    buildTest(query, function(string, parsedUrl) {
      var queryKeys = _.pull(_.keys(query), 'baseUrl');
      expect(string).to.be.a('string');
      expect(parsedUrl).to.have.keys(queryKeys);
      expect(parsedUrl.s).to.equal('Search');
      expect(parsedUrl.q).to.equal(stringValue);
      expect(parsedUrl.format).to.equal(query.format);
      expect(parsedUrl.folderId).to.equal(query.folderId);
      expect(parsedUrl.max).to.equal(query.max);
      done();
    });
  });

  it('should return a valid querystring with undefined fields property removed', function(done) {
    var query = _.assign({}, config, {
      q: stringValue,
      fields: undefined
    });

    buildTest(query, function(string, parsedUrl) {
      var queryKeys = _.pull(_.keys(query), 'baseUrl', 'fields');
      expect(string).to.be.a('string');
      expect(parsedUrl).to.have.keys(queryKeys);
      expect(parsedUrl.s).to.equal('Search');
      expect(parsedUrl.q).to.equal(stringValue);
      expect(parsedUrl.format).to.equal(query.format);
      expect(parsedUrl.fields).to.equal(query.fields);
      expect(parsedUrl.max).to.equal(query.max);
      done();
    });
  });


  it('should return a valid querystring with undefined folderId property removed', function(done) {
    var query = _.assign({}, config, {
      q: stringValue,
      folderId: undefined
    });

    buildTest(query, function(string, parsedUrl) {
      var queryKeys = _.pull(_.keys(query), 'baseUrl', 'folderId');
      expect(string).to.be.a('string');
      expect(parsedUrl).to.have.keys(queryKeys);
      expect(parsedUrl.s).to.equal('Search');
      expect(parsedUrl.q).to.equal(stringValue);
      expect(parsedUrl.format).to.equal(query.format);
      expect(parsedUrl.folderId).to.equal(query.folderId);
      expect(parsedUrl.max).to.equal(query.max);
      done();
    });
  });

  it('should reject with an undefined query value', function() {
    var noQuery = _.assign({}, config);
    expect(buildSearchQuery(noQuery)).to.be.instanceof(Error);
  });

  it('should reject with a query value that is an object', function() {
    var invalidQuery = _.assign({}, config);
    expect(buildSearchQuery(invalidQuery)).to.be.instanceof(Error);
  });
});
