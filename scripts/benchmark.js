require('shelljs/global');
const benchmark = require('./lib/speed');
const fs = require('fs');
const chalk = require('chalk');

const fileSize = function(src) {
  var stats = fs.statSync(src);
  return stats['size'] / 1000.0;
};

const redGreen = function(last, now, unit) {
  const diff = now - last;
  let percent = (diff / last) * 100;
  percent = parseInt(percent, 10);
  if (percent < 0) {
    console.log('       ' + chalk.green(' ' + percent + '%     ' + diff + ' ' + unit));
  } else if (percent === 0) {
    console.log('       ' + chalk.yellow(' ' + percent + '%     ' + diff + ' ' + unit));
  } else {
    console.log('       ' + chalk.red('+' + percent + '%     ' + diff + ' ' + unit));
  }
  console.log('');
};

const compare = function(obj) {
  console.log('');
  let last = JSON.parse(fs.readFileSync('./scripts/lib/log.json'));
  console.log('   size:');
  redGreen(last.size, obj.size, 'kb');
  console.log('   init:');
  redGreen(last.init, obj.init, 'ms');
  console.log('   parse:');
  redGreen(last.big, obj.big, 'ms');
};

benchmark((obj) => {
  obj.size = fileSize('builds/compromise.min.js');
  let out = JSON.stringify(obj, null, 2);
  compare(obj);
// console.log(out);
// fs.writeFileSync('./scripts/lib/log.json', out);
});
