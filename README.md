node-sciencebase
================

A USGS Science Base API

[https://my.usgs.gov/confluence/display/sciencebase/ScienceBase](https://my.usgs.gov/confluence/display/sciencebase/ScienceBase)

## Install

`$ git clone git@github.com:apburnes/node-sciencebase.git && cd node-sciencebase`

`$ npm install`

## Test

`$ npm test`

## Example

```js
// Note: Work in progress and not published to NPM
var sbClient = require('node-sciencebase');

var options = {};

// List all catalog items related to "water"
var searchQuery = {
  q = "water"
};

// Callback Style
sbClient(options).search(searchQuery, function(err, data) {
  if (err) {
    // handle error
  }

  // handle returned data
});

// Promise Style
sbClient(options).search(searchQuery)
  .then(function(data) {
    // handle data
  })
  .catch(function(err) {
    // handle err
  });
```

## API

### search(options, [callback]) => optional callback if used as a promise

Paramaters
- options: Object, the query object
  - q: String, a string value to query science base
- callback: Function, with a signature `function(err, data)`
  - err: Error
  - data: Object, object with response information
    - statusCode: Number, the request response status code
    - headers: Object, the request response headers
    - path: String, the request url path
    - body: Default JSON Object, the data returned from the sciencebase query
