var exec = require('shelljs').exec;
var tape = '"node_modules/.bin/tape"';
var tapSpec = '"node_modules/.bin/tap-spec" --color';
// var tapMin = '"node_modules/.bin/tap-min" --color';

//the quotations here are strangely-important
exec(tape + ' "./test/unit/**/*.test.js" | ' + tapSpec);

// var tapMin = '"node_modules/.bin/tap-min" --color';
// exec(tape + ' "./test/unit/**/*.test.js" | ' + tapMin);
