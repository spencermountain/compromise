require('shelljs/global');
var tape = '"node_modules/.bin/tape"';
var tapMin = '"node_modules/.bin/tap-min" --color';

console.log('testing  built package..');
exec('TESTENV=prod ' + tape + ' "./test/unit/**/*.test.js" | ' + tapMin);
console.log(' - done.');
