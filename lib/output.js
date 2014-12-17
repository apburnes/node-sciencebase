'use strict';

function onSuccess(data) {
  var response = {
    statusCode: data.statusCode,
    headers: data.headers,
    method: data.req.method,
    path: data.req.path,
    body: data.body
  };

  return response;
}

function onError(err) {
  return err;
}

module.exports = {
  onSuccess: onSuccess,
  onError: onError
};