'use strict';
var fs = require('fs');

var fileSize = function(src) {
  var stats = fs.statSync(src);
  return (stats['size'] / 1000.0).toFixed(2);
};

module.exports = fileSize;
