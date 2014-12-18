'use strict';

var _ = require('lodash');

var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));

function formatObj(obj) {
  var formatted = _.forIn(obj, function(value, key, obj) {
    if (_.isString(value)) {
      return obj[key] = value;
    }

    if (_.isArray(value)) {
      return obj[key] = value.join(',');
    }

    if (_.isPlainObject(value) || _.isUndefined(value)) {
      return obj[key] = undefined;
    }
  });

  return formatted;
}

function processQuery(query, source) {
  return new Promise(function(resolve, reject) {
    if (_.isString(query) || _.isArray(query)) {
      var reassigned = _.assign({}, source, {
        q: query
      });

      return resolve(formatObj(reassigned));
    }

    if (_.isPlainObject(query)) {
      var combined = _.assign({}, source, query);

      return resolve(formatObj(combined));
    }

    reject(Error('Query is invalid data type'));
  });
}

module.exports = processQuery;
