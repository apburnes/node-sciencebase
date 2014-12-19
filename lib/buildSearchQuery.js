'use strict';

var _ = require('lodash');
var qs = require('qs');

function omitUndefined(value) {
  return typeof value === 'undefined';
}

function stringifyMerge(queryObject, config) {
  var querystring = qs.stringify(queryObject, { delimeter: '&' });
  var url = config.baseUrl.concat('?', querystring);

  return _.assign({}, config, {
    url: url
  });
}

function createQueryString(options) {
  var search = { s: 'Search' };

  var queryObject = _(search)
    .assign({ q: options.q })
    .assign({ format: options.format })
    .assign({ folderId: options.folderId })
    .assign({ fields: options.fields })
    .assign({ max: options.max })
    .omit(omitUndefined)
    .value();

  return stringifyMerge(queryObject, options);
}

function buildSearchQuery(options) {
  if (!(_.has(options, 'q'))) {
    return Error('Query key and value is not defined');
  }

  if (_.isPlainObject(options.q)) {
    return Error('Query value must be a string');
  }

  return createQueryString(options);
}

module.exports = buildSearchQuery;
