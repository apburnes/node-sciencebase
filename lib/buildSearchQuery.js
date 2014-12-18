'use strict';

var _ = require('lodash');
var qs = require('qs');

function omitUndefined(value) {
  return typeof value === 'undefined';
}

function stringifyQuery(queryObject, url) {
  var querystring = qs.stringify(queryObject, { delimeter: '&' });

  return url.concat('?', querystring);
}

function createQueryString(options) {
  var url = options.baseUrl;
  var search = { s: 'Search' };

  var queryObject = _(search)
    .assign({ q: options.q })
    .assign({ format: options.format })
    .assign({ folderId: options.folderId })
    .assign({ fields: options.fields })
    .assign({ max: options.max })
    .omit(omitUndefined)
    .value();

  return stringifyQuery(queryObject, url);
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
