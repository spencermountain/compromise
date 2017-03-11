'use strict';
require('shelljs/global');
config.silent = true;
const efrt = require('efrt');
const fs = require('fs');
const data = require('../src/lexicon');

//cleanup. remove old builds
exec('rm -rf ./src/lexicon/_packed/');
exec('mkdir ./src/lexicon/_packed/');

Object.keys(data).forEach((k) => {
  let packed = efrt.pack(data[k]);
  let src = './src/lexicon/_packed/_' + k + '.js';
  let content = 'module.exports=\'' + packed + '\'';
  fs.writeFileSync(src, content, 'utf8');
});
