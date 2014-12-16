'use strict';

var search = require('./lib/search');
var baseUrl = 'https://www.sciencebase.gov/catalog/items';

function Client(options) {
  if(!(this instanceof Client)) {
    return new Client(options);
  }
  
  this.baseUrl = baseUrl;
  this.format = {
    format: 'json'
  };
}

Client.prototype = {
  search: search.search,
  searchStream: search.stream
};

module.exports = Client;
  