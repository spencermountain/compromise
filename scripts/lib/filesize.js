'use strict';
const fs = require('fs');

const fileSize = function(src) {
  var stats = fs.statSync(src);
  return (stats['size'] / 1000.0).toFixed(2);
};

module.exports = fileSize;
