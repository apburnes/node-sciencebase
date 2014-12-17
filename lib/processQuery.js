'use strict';

var _ = require('lodash');

function processQuery(query, source) {
  if (_.isString(query)) {
    return _.assign({}, source, {
      q: query
    });
  }

  if (_.isArray(query)) {
    return _.assign({}, source, {
      q: query.join(',')
    });
  }

  if (_.isPlainObject(query)) {
    return _.assign({}, source, query);
  }
}

module.exports = processQuery;