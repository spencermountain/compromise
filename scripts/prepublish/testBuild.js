var exec = require('shelljs').exec;
var tape = '"node_modules/.bin/tape"';
var tapSpec = '"node_modules/.bin/tap-dancer" --color';

console.log('testing  built package..');
exec('TESTENV=prod ' + tape + ' "./test/unit/**/*.test.js" | ' + tapSpec);
console.log(' - done.');
