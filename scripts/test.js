var exec = require('shelljs').exec;
var tape = '"node_modules/.bin/tape"';
var tapMin = '"node_modules/.bin/tap-min" --color';

//the quotations here are strangely-important
exec(tape + ' "./test/unit/**/*.test.js" | ' + tapMin);

// var tapMin = '"node_modules/.bin/tap-min" --color';
// exec(tape + ' "./test/unit/**/*.test.js" | ' + tapMin);
