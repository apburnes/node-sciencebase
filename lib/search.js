'use strict';

var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var buildSearchQuery = require('./buildSearchQuery');

function search(options) {
  return buildSearchQuery(options)
    .then(function(url) {
      var reqObject = {
        url: url,
        json: true
      };

      return request.getAsync(reqObject);
    });
}

module.exports = search;
  