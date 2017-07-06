var benchmark = require('./lib/benchmark');
var fs = require('fs');
var chalk = require('chalk');

var redGreen = function(last, now, unit) {
  var diff = (now - last).toFixed(2);
  var percent = diff / last * 100;
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

var compare = function(obj) {
  console.log('');
  var last = JSON.parse(fs.readFileSync('./scripts/lib/log.json'));
  console.log('   size:');
  redGreen(last.size, obj.size, 'kb');
  console.log('   init:');
  redGreen(last.init, obj.init, 'ms');
  console.log('   parse:');
  redGreen(last.big, obj.big, 'ms');
};

benchmark(obj => {
  compare(obj);
  // console.log(JSON.stringify(obj, null, 2));
  // fs.writeFileSync('./scripts/lib/log.json', out);
});
