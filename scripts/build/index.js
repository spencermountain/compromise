var fs = require('fs');
var benchmark = require('../lib/benchmark');
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
benchmark(obj => {
  obj.size = fileSize('./builds/compromise.min.js');
  var out = JSON.stringify(obj, null, 2);
  console.log(out);
  fs.writeFileSync('./scripts/lib/log.json', out);
});
