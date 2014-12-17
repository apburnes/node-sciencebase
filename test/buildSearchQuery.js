'use strict';

var _ = require('lodash');
var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-as-promised'));

var qs = require('qs');

var buildSearchQuery = require('../lib/buildSearchQuery');

var stringValue = 'water';
var listValues = 'water,earth,plants';

var config = {
  baseUrl: 'https://www.sciencebase.gov/catalog/items',
  format: 'json',
  max: '20'
};

var queryKeys = [
  's',
  'q',
  'format',
  'max'
];

describe('Build Search Query', function() {

  function parseUrl(url) {
    var q = url.split('?')[1];
    return qs.parse(q);
  }

  it('should return a valid querystring with key "q" for query', function() {
    var query = _.assign({}, config, {
      q: stringValue
    });

    return expect(buildSearchQuery(query))
      .to.eventually.be.a('string')
      .then(function(url) {
        var parsedUrl = parseUrl(url);
        expect(parsedUrl).to.have.keys(queryKeys);
        expect(parsedUrl.s).to.equal('Search');
        expect(parsedUrl.q).to.equal(stringValue);
        expect(parsedUrl.format).to.equal(config.format);
        expect(parsedUrl.max).to.equal(config.max);
      });
  });

  it('should return a valid querystring with an query value array', function() {
    var query = _.assign({}, config, {
      q: listValues
    });

    return expect(buildSearchQuery(query))
      .to.eventually.be.a('string')
      .then(function(url) {
        var parsedUrl = parseUrl(url);
        expect(parsedUrl).to.have.keys(queryKeys);
        expect(parsedUrl.q).to.equal(listValues);
        expect(parsedUrl.format).to.equal(config.format);
        expect(parsedUrl.max).to.equal(config.max);
      });
  });

  it('should reject with a query object without the query key', function() {
    var noQuery = _.assign({}, config);

    return expect(buildSearchQuery(noQuery))
      .to.eventually.be.rejectedWith(Error);
  });

  it('should reject with a query value that is an object data type', function() {
    var invalidQueryData = _.assign({}, config, {
      q: {}
    });

    return expect(buildSearchQuery(invalidQueryData))
      .to.eventually.be.rejectedWith(Error);
  });
});