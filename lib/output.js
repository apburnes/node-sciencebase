'use strict';

var _ = require('lodash');

module.exports.onSuccess = function onSuccess(data) {
  return _.assign ({}, {
    statusCode: data[0].statusCode,
    headers: data[0].headers,
    method: data[0].req.method,
    path: data[0].req.path,
    body: data[1]
  });
};

module.exports.onError = function onError(err) {
  return err;
};