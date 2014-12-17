'use strict';

var _ = require('lodash');
var qs = require('qs');
var Promise= require('bluebird');

function initSearch() {
  return new Promise(function(resolve, reject) {
    var queryObject = {
      s: 'Search'
    };

    resolve(queryObject);
  });
}

function buildSearchQuery(options) {
  if (!(_.has(options, 'q'))) {
    return Promise.reject(Error('Query key and value is not defined'));
  }

  if (_.isPlainObject(options.q)) {
    return Promise.reject(Error('Query value must be a string or array'));
  }

  return initSearch()
    .then(function(search) {
      return _.assign(search, {
        q: options.q
      });
    })
    .then(function(query) {
      return _.assign(query, {
        format: options.format,
        max: options.max
      });
    })
    .then(function(queryObject) {
      var querystring = qs.stringify(queryObject, { delimeter: '&' });
      var url = options.baseUrl;

      return url.concat('?', querystring);
    });
}

module.exports = buildSearchQuery;