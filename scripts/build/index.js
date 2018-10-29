var fs = require('fs');
var exec = require('shelljs').exec;

//pack the tries
require('../pack');

//cleanup. remove old builds
exec('rm -rf ./builds && mkdir builds');

//build each version
require('./es6-build');
require('./es5-build');

//sanity test them
require('./quicktest');

var fileSize = function(src) {
  var stats = fs.statSync(src);
  return stats['size'] / 1000.0;
};

//log the filesize and speed
let size = fileSize('./builds/compromise.min.js');
console.log(size + 'kb');
