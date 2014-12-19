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

  function parseUrl(query) {
    expect(query.s).to.equal(config.s);
    expect(query.format).to.equal(config.format);
    expect(query.max).to.equal(config.max);
    var q = query.url.split('?')[1];
    return qs.parse(q);
  }

  function buildTest(query, callback) {
    callback(buildSearchQuery(query), parseUrl(buildSearchQuery(query)));
  }

  it('should return a valid querystring with key "q" for query', function(done) {
    var query = _.assign({}, config, {
      q: stringValue
    });

    buildTest(query, function(res, parsedUrl) {
      var queryKeys = _.pull(_.keys(query), 'baseUrl');
      expect(res).to.be.an('object');
      expect(res.url).to.be.a('string');
      expect(parsedUrl).to.have.keys(queryKeys);
      expect(parsedUrl.s).to.equal(res.s);
      expect(parsedUrl.q).to.equal(res.q);
      expect(parsedUrl.format).to.equal(res.format);
      expect(parsedUrl.max).to.equal(res.max);
      done();
    });
  });

  it('should return a valid querystring with fields property added', function(done) {
    var query = _.assign({}, config, {
      q: stringValue,
      fields: stringValue
    });

    buildTest(query, function(res, parsedUrl) {
      var queryKeys = _.pull(_.keys(query), 'baseUrl');
      expect(res).to.be.an('object');
      expect(res.url).to.be.a('string');
      expect(parsedUrl).to.have.keys(queryKeys);
      expect(parsedUrl.s).to.equal(res.s);
      expect(parsedUrl.q).to.equal(res.q);
      expect(parsedUrl.fields).to.equal(res.fields);
      expect(parsedUrl.format).to.equal(res.format);
      expect(parsedUrl.max).to.equal(res.max);
      done();
    });
  });

  it('should return a valid querystring with folderId property added', function(done) {
    var query = _.assign({}, config, {
      q: stringValue,
      folderId: stringValue
    });

    buildTest(query, function(res, parsedUrl) {
      var queryKeys = _.pull(_.keys(query), 'baseUrl');
      expect(res).to.be.an('object');
      expect(res.url).to.be.a('string');
      expect(parsedUrl).to.have.keys(queryKeys);
      expect(parsedUrl.s).to.equal(res.s);
      expect(parsedUrl.q).to.equal(res.q);
      expect(parsedUrl.folderId).to.equal(res.folderId);
      expect(parsedUrl.format).to.equal(res.format);
      expect(parsedUrl.max).to.equal(res.max);
      done();
    });
  });

  it('should return a valid querystring with undefined fields property removed', function(done) {
    var query = _.assign({}, config, {
      q: stringValue,
      fields: undefined
    });

    buildTest(query, function(res, parsedUrl) {
      var queryKeys = _.pull(_.keys(query), 'baseUrl', 'fields');
      expect(res).to.be.an('object');
      expect(res.url).to.be.a('string');
      expect(parsedUrl).to.have.keys(queryKeys);
      expect(parsedUrl.s).to.equal(res.s);
      expect(parsedUrl.q).to.equal(res.q);
      expect(parsedUrl.fields).to.equal(undefined);
      expect(parsedUrl.format).to.equal(res.format);
      expect(parsedUrl.max).to.equal(res.max);
      done();
    });
  });


  it('should return a valid querystring with undefined folderId property removed', function(done) {
    var query = _.assign({}, config, {
      q: stringValue,
      folderId: undefined
    });

    buildTest(query, function(res, parsedUrl) {
      var queryKeys = _.pull(_.keys(query), 'baseUrl', 'folderId');
      expect(res).to.be.an('object');
      expect(res.url).to.be.a('string');
      expect(parsedUrl).to.have.keys(queryKeys);
      expect(parsedUrl.s).to.equal(res.s);
      expect(parsedUrl.q).to.equal(res.q);
      expect(parsedUrl.folderId).to.equal(undefined);
      expect(parsedUrl.format).to.equal(res.format);
      expect(parsedUrl.max).to.equal(res.max);
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
