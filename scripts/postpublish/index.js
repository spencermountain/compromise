require('shelljs/global');
const benchmark = require('../lib/speed');
const fs = require('fs');
const chalk = require('chalk');

const fileSize = function(src) {
  var stats = fs.statSync(src);
  return stats['size'] / 1000.0;
};

//log the filesize and speed
benchmark((obj) => {
  obj.size = fileSize('./builds/compromise.min.js');
  let out = JSON.stringify(obj, null, 2);
  console.log(out);
  fs.writeFileSync('./scripts/lib/log.json', out);
});
