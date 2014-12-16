'use strict';

var _ = require('lodash');
var qs = require('qs');
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));

var onSuccess = require('./output').onSuccess;

function buildSearchQuery(options, self) {
  var searchQuery = {
    s: 'Search'
  };
  
  var querystring = _(searchQuery)
    .assign(options)
    .assign(self.format)
    .tap(function(obj) {
      return qs.stringify(obj, {delimeter: '&'});
    })
    .value();
  
  var opts = {
    url: self.baseUrl,
    qs: querystring,
    json: self.format.format === 'json'
  };
  
  return opts;
}

function search(options, callback) {
  if (!(_.isObject(options))) {
    return Promise.reject(Error('Search options paramater is not an object'));
  }
  
  var self = this;
  var opts = buildSearchQuery(options, self);
  
  return request.getAsync(opts)
    .then(onSuccess)
    .nodeify(callback);
}

function searchStream(options) {
  var self = this;
  var opts = buildSearchQuery(options, self);
  
  return request.get(opts)
    .pipe(onSuccess);
}

module.exports = {
  search: search,
  searchStream: searchStream
};
  