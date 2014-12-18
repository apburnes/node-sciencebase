'use strict';

var _ = require('lodash');

var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));

var processQuery = require('./lib/processQuery');
var buildSearchQuery = require('./lib/buildSearchQuery');
var onSuccess = require('./lib/formatOutput').onSuccess;

var config = {
  baseUrl: 'https://www.sciencebase.gov/catalog/items',
  format: 'json',
  max: 20
};

function Client(options) {
  if (!(this instanceof Client)) {
    return new Client(options);
  }

  if (!(_.isObject(options))) {
    options = {};
  }

  this.config = _.defaults(options, config);
}

Client.prototype = {
  search: function(query, callback) {
    return processQuery(query, this.config)
      .then(buildSearchQuery)
      .then(function(url) {
        var reqObject = {
          url: url,
          json: true
        };

        console.log(reqObject);
        return request.getAsync(reqObject);
      })
      .spread(onSuccess)
      .nodeify(callback);
  }
};

module.exports = Client;

