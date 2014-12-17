'use strict';

var _ = require('lodash');

var search = require('./lib/search');
var processQuery = require('./lib/processQuery');
var onSuccess = require('./lib/output').onSuccess;

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
    var options = processQuery(query, this.config);

    return search(options)
      .spread(onSuccess)
      .nodeify(callback);
  }
};

module.exports = Client;
  